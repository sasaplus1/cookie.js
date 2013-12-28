describe('cookie', function() {

  function MockCookie() {
    this.value_ = '';
    Object.defineProperty(this, 'cookie', {
      get: function() {
        return this.value_;
      },
      set: function(value) {
        this.value_ += (this.value_ && ';') + value;
      }
    });
  }

  describe('#get()', function() {

    beforeEach(function() {
      window.mock = new MockCookie;
      window.mock.cookie = 'name1=value1';
      window.mock.cookie = 'name2=value2';
      window.mock.cookie = 'name3=value3';
      window.mock.cookie = 'iroha=%E3%81%84%E3%82%8D%E3%81%AF';
      window.mock.cookie = '  space=%20%20%E7%A9%BA%E7%99%BD';
    });

    afterEach(function() {
      window.mock = null;
    });

    it('should get any values if not set name', function() {
      expect(cookie.get()).to.eql({
        name1: 'value1',
        name2: 'value2',
        name3: 'value3',
        iroha: 'いろは',
        space: '  空白',
      });
    });

    it('should get value with name', function() {
      expect(cookie.get('name1')).to.be('value1');
      expect(cookie.get('name2')).to.be('value2');
      expect(cookie.get('name3')).to.be('value3');
      expect(cookie.get('iroha')).to.be('いろは');
      expect(cookie.get('space')).to.be('  空白');
    });

    it('should return null if not found name', function() {
      expect(cookie.get('special-name')).to.be(null);
    });

  });

  describe('#get() with unexpected characters', function() {

    var ucNames = [
          '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07',
          '\x08', '\x09', '\x0a', '\x0b', '\x0c', '\x0d', '\x0e', '\x0f',
          '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17',
          '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f',
          '\x20', '\x22', '\x28', '\x29', '\x2c', '\x2f', '\x3a', '\x3b',
          '\x3c', '\x3d', '\x3e', '\x3f', '\x40', '\x5b', '\x5c', '\x5d',
          '\x7b', '\x7d', '\x7f'
        ],
        ucValues = [
          '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07',
          '\x08', '\x09', '\x0a', '\x0b', '\x0c', '\x0d', '\x0e', '\x0f',
          '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17',
          '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f',
          '\x20', '\x22', '\x2c', '\x3b', '\x5c', '\x7f'
        ];

    beforeEach(function() {
      var i, len;

      window.mock = new MockCookie;

      for (i = 0, len = ucNames.length; i < len; ++i) {
        window.mock.cookie = ucNames[i] + '=';
      }

      for (i = 0, len = ucValues.length; i < len; ++i) {
        window.mock.cookie = ucValues[i].charCodeAt(0) + '=' + ucValues[i];
      }
    });

    afterEach(function() {
      window.mock = null;
    });

    it('should not get value if name has unexpected character', function() {
      var i, len;

      for (i = 0, len = ucNames.length; i < len; ++i) {
        expect(cookie.get(ucNames[i])).to.be(null);
      }
    });

    it('should not get value if value has unexpected character', function() {
      var i, len;

      for (i = 0, len = ucValues.length; i < len; ++i) {
        expect(cookie.get(ucValues[i].charCodeAt(0))).to.be(null);
      }
    });

  });

  describe('#set()', function() {

    beforeEach(function() {
      window.mock = new MockCookie;
    });

    afterEach(function() {
      window.mock = null;
    });

    it('should set some values if parameter is array', function() {
      cookie.set([
        {name: 'name1', value: 'value1', expires: 'Wed, 25 Dec 2013 15:24:47 GMT'},
        {name: 'name2', value: 'value2', maxage: 60},
        {name: 'name3', value: 'value3', domain: 'localhost'},
        {name: 'name4', value: 'value4', path: '/'},
        {name: 'iroha', value: 'いろは', secure: true}
      ]);

      expect(window.mock.cookie).to.be(
        'name1=value1;Expires=Wed, 25 Dec 2013 15:24:47 GMT;' +
        'name2=value2;Max-Age=60;' +
        'name3=value3;Domain=localhost;' +
        'name4=value4;Path=/;' +
        'iroha=%E3%81%84%E3%82%8D%E3%81%AF;Secure'
      );
    });

    it('should set value for name', function() {
      cookie.set('name1', 'value1', {expires: 'Wed, 25 Dec 2013 15:24:47 GMT'});
      cookie.set('name2', 'value2', {maxage: 60});
      cookie.set('name3', 'value3', {domain: 'localhost'});
      cookie.set('name4', 'value4', {path: '/'});
      cookie.set('iroha', 'いろは', {secure: true});

      expect(window.mock.cookie).to.be(
        'name1=value1;Expires=Wed, 25 Dec 2013 15:24:47 GMT;' +
        'name2=value2;Max-Age=60;' +
        'name3=value3;Domain=localhost;' +
        'name4=value4;Path=/;' +
        'iroha=%E3%81%84%E3%82%8D%E3%81%AF;Secure'
      );
    });

    it('can be method chain', function() {
      cookie
        .set('name1', 'value1')
        .set('name2', 'value2')
        .set('name3', 'value3');

      expect(window.mock.cookie).to.be(
        'name1=value1;' +
        'name2=value2;' +
        'name3=value3'
      );
    });

  });

});
