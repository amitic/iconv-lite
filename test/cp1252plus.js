let fs      = require('fs'),
    assert  = require('assert'),
    iconv   = require(__dirname + '/../');

describe("CP1252+ tests", function() {

    it("CP1252+ file read, decoded, encoded and compared", function() {
        let contentBuffer = fs.readFileSync(__dirname+"/checkdate");
        let decoded = iconv.decode(contentBuffer, "CP1252+");
        let reencodedBuffer = iconv.encode(decoded, "CP1252+");
        let original = iconv.decode(contentBuffer, "CP1256");
        assert.strictEqual(iconv.decode(contentBuffer, "CP1256"), iconv.decode(reencodedBuffer, "CP1256"));
        // assert.equal(contentBuffer.byteLength, reencodedBuffer.byteLength);
        for (let i = 0, len = contentBuffer.byteLength; i < len; i++) {
            if (contentBuffer.readUInt8(i) !== reencodedBuffer.readUInt8(i)) {
                // console.log(i, contentBuffer.readUInt8(i), reencodedBuffer.readUInt8(i));
            }
        }
    });

});
