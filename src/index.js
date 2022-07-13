// fsをインポート
const fs = require('fs');
// ChannelとChannelsをインポート
const ch = require('./Channel.js');

// １つ目の引数を取得
const fileName = process.argv[2];
//const fileName = "test.mus";

// 初期化
const chList = new ch.ChannelList();

// ファイルを読み込む
const text = fs.readFileSync(fileName, 'utf8');

text.split('\n').forEach(
    line => {
        line = line.trim();
        const m = /^([0-9a-h])[ \t]+(.*)$/gi.exec(line);
        if(m != null && m.length > 0) {
            const ch = m[1];
            const mml = [];
            //console.log(`data:${m[2]}`);
            for(const m2 of m[2].matchAll(/([a-z\[\]@\\][\+\-]?%?\d*(,\d+){0,}|[ <>~&]|;.*)/gi)) {
                const m3 = m2[0].match(/^([a-z\[\]@\\][\+\-]?%?)(\d*(,\d+){0,})|(.*)/i);
                if(m3[1] != undefined) {
                    const cmd = m3[1].toLowerCase();
                    const param = m3[2].toLowerCase();
                    //console.log(`${m2[0]}:${cmd},${param}`);
                    if       (cmd == 'o') {
                        chList.channel[ch].oct = parseInt(param);
                        chList.channel[ch].octOutput = false;
                    } else if(cmd == 'v') {
                        chList.channel[ch].vol = parseInt(param);
                        chList.channel[ch].volOutput = false;
                    } else if(cmd == 'v+') {
                        chList.channel[ch].vol++;
                        chList.channel[ch].volOutput = false;
                    } else if(cmd == 'v-') {
                        chList.channel[ch].vol--;
                        chList.channel[ch].volOutput = false;
                    } else if(cmd == '>') {
                        chList.channel[ch].oct++;
                        chList.channel[ch].octOutput = false;
                    } else if(cmd == '<') {
                        chList.channel[ch].oct--;
                        chList.channel[ch].octOutput = false;
                    } else {
                        // 音階発音の前にオクターブ、音量を設定
                        if(cmd.substring(0,1) >= 'a' && cmd.substring(0,1) <= 'g') {
                            if(!chList.channel[ch].octOutput) {
                                if(chList.channel[ch].oct <= 3) {
                                    if(chList.channel[ch].voice != 0) {
                                        chList.channel[ch].voice = 0;
                                        mml.push(`@00`);
                                    }
                                }
                                if(chList.channel[ch].oct == 4) {
                                    chList.channel[ch].voice = 1;
                                    mml.push(`@01`);
                                }
                                if(chList.channel[ch].oct >= 5) {
                                    chList.channel[ch].voice = 2;
                                    mml.push(`@02`);
                                }
                                if(chList.channel[ch].oct >= 6) {
                                    chList.channel[ch].voice = 3;
                                    mml.push(`@03`);
                                }
                                mml.push(`O${chList.channel[ch].oct}`);
                                chList.channel[ch].octOutput = true;
                            }
                            if(!chList.channel[ch].volOutput) {
                                // ボリュームの調整はほとんど効果がない
                                // let vol = chList.channel[ch].vol;
                                // if(chList.channel[ch].oct == 5) {
                                //     vol -= 1;
                                // }
                                // if(chList.channel[ch].oct == 6) {
                                //     vol -= 3;
                                // }
                                // if(chList.channel[ch].oct == 7) {
                                //     vol -= 5;
                                // }
                                // if(chList.channel[ch].oct == 8) {
                                //     vol -= 7;
                                // }
                                // if(vol <= 0) vol = 1;
                                mml.push(`V${chList.channel[ch].vol}`);
                                chList.channel[ch].volOutput = true;
                            }
                        }
                        mml.push(cmd);
                        if(param != null && param.length > 0) {
                            mml.push(param);
                        }
                    }
                }
            }
            console.log(`${ch} ${mml.join("")}`);
        }
    }
)
