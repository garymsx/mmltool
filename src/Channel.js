// chを定義
class Channel {
    ch = '';
    oct = 0;
    vol = 0;
    voice = 0;
    octOutput = false;
    volOutput = false;
    constructor(ch) {
        this.ch = ch;
    }
}

class ChannelList {
    channel = [];
    constructor() {
        this.channel['1'] = new Channel('1');
        this.channel['2'] = new Channel('2');
        this.channel['3'] = new Channel('3');
        this.channel['4'] = new Channel('4');
        this.channel['5'] = new Channel('5');
        this.channel['6'] = new Channel('6');
        this.channel['7'] = new Channel('7');
        this.channel['8'] = new Channel('8');
        this.channel['9'] = new Channel('9');
        this.channel['a'] = new Channel('a');
        this.channel['b'] = new Channel('b');
        this.channel['c'] = new Channel('c');
        this.channel['d'] = new Channel('d');
        this.channel['e'] = new Channel('e');
        this.channel['f'] = new Channel('f');
        this.channel['g'] = new Channel('g');
        this.channel['h'] = new Channel('h');
    }
}

module.exports.Channel = Channel;
module.exports.ChannelList = ChannelList;
