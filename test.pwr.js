(function () {
    'use strict';
    var assert = this.assert;
    describe('cookie', function () {
        function MockCookie() {
            this.value_ = '';
            Object.defineProperty(this, 'cookie', {
                get: function () {
                    return this.value_;
                },
                set: function (value) {
                    this.value_ += (this.value_ && '; ') + value;
                }
            });
        }
        describe('.get()', function () {
            beforeEach(function () {
                cookie.config.raw = false;
                window.mock = new MockCookie();
                window.mock.cookie = 'name=value';
                window.mock.cookie = 'quote=%22quote%22';
                window.mock.cookie = 'iroha=%E3%81%84%E3%82%8D%E3%81%AF';
            });
            afterEach(function () {
                delete window.mock;
            });
            it('should got cookie-pairs', function () {
                assert.deepEqual(assert._expr(assert._capt(assert._capt(cookie, 'arguments/0/callee/object').get(), 'arguments/0'), {
                    content: 'assert.deepEqual(cookie.get(), {name: \'value\',quote: \'"quote"\',iroha: \'\u3044\u308D\u306F\'})',
                    filepath: 'test.js',
                    line: 38
                }), {
                    name: 'value',
                    quote: '"quote"',
                    iroha: '\u3044\u308D\u306F'
                });
            });
            it('should got cookie-pairs, raw mode is true', function () {
                cookie.config.raw = true;
                assert.deepEqual(assert._expr(assert._capt(assert._capt(cookie, 'arguments/0/callee/object').get(), 'arguments/0'), {
                    content: 'assert.deepEqual(cookie.get(), {name: \'value\',quote: \'%22quote%22\',iroha: \'%E3%81%84%E3%82%8D%E3%81%AF\'})',
                    filepath: 'test.js',
                    line: 48
                }), {
                    name: 'value',
                    quote: '%22quote%22',
                    iroha: '%E3%81%84%E3%82%8D%E3%81%AF'
                });
            });
            it('should got cookie-value', function () {
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('name'), 'arguments/0/left') === 'value', 'arguments/0'), {
                    content: 'assert(cookie.get(\'name\') === \'value\')',
                    filepath: 'test.js',
                    line: 56
                }));
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('quote'), 'arguments/0/left') === '"quote"', 'arguments/0'), {
                    content: 'assert(cookie.get(\'quote\') === \'"quote"\')',
                    filepath: 'test.js',
                    line: 57
                }));
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('iroha'), 'arguments/0/left') === '\u3044\u308D\u306F', 'arguments/0'), {
                    content: 'assert(cookie.get(\'iroha\') === \'\u3044\u308D\u306F\')',
                    filepath: 'test.js',
                    line: 58
                }));
            });
            it('should got cookie-value, raw mode is true', function () {
                cookie.config.raw = true;
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('name'), 'arguments/0/left') === 'value', 'arguments/0'), {
                    content: 'assert(cookie.get(\'name\') === \'value\')',
                    filepath: 'test.js',
                    line: 64
                }));
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('quote'), 'arguments/0/left') === '%22quote%22', 'arguments/0'), {
                    content: 'assert(cookie.get(\'quote\') === \'%22quote%22\')',
                    filepath: 'test.js',
                    line: 65
                }));
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('iroha'), 'arguments/0/left') === '%E3%81%84%E3%82%8D%E3%81%AF', 'arguments/0'), {
                    content: 'assert(cookie.get(\'iroha\') === \'%E3%81%84%E3%82%8D%E3%81%AF\')',
                    filepath: 'test.js',
                    line: 66
                }));
            });
            it('should got null when cookie-name is not found', function () {
                assert(assert._expr(assert._capt(assert._capt(assert._capt(cookie, 'arguments/0/left/callee/object').get('unknown'), 'arguments/0/left') === null, 'arguments/0'), {
                    content: 'assert(cookie.get(\'unknown\') === null)',
                    filepath: 'test.js',
                    line: 70
                }));
            });
        });
        describe('.set()', function () {
            beforeEach(function () {
                cookie.config.raw = false;
                window.mock = new MockCookie();
            });
            afterEach(function () {
                delete window.mock;
            });
            it('should set cookie-pairs', function () {
                cookie.set([
                    {
                        name: 'name',
                        value: 'value',
                        domain: 'localhost',
                        maxage: 1423839600000
                    },
                    {
                        name: 'quote',
                        value: '"quote"',
                        path: '/',
                        secure: true
                    },
                    {
                        name: 'iroha',
                        value: '\u3044\u308D\u306F',
                        expires: 'Sat Feb 14 2015 00:00:00 GMT+0900 (JST)'
                    }
                ]);
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(window, 'arguments/0/left/object/object').mock, 'arguments/0/left/object').cookie, 'arguments/0/left') === assert._capt(assert._capt(assert._capt('name=value; Max-Age=1423839600000; Domain=localhost; ' + 'quote=%22quote%22; Path=/; Secure; ', 'arguments/0/right/left/left') + 'iroha=%E3%81%84%E3%82%8D%E3%81%AF; ', 'arguments/0/right/left') + 'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(window.mock.cookie === \'name=value; Max-Age=1423839600000; Domain=localhost; \' + \'quote=%22quote%22; Path=/; Secure; \' + \'iroha=%E3%81%84%E3%82%8D%E3%81%AF; \' + \'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)\')',
                    filepath: 'test.js',
                    line: 108
                }));
            });
            it('should set cookie-pairs, raw mode is true', function () {
                cookie.config.raw = true;
                cookie.set([
                    {
                        name: 'name',
                        value: 'value',
                        domain: 'localhost',
                        maxage: 1423839600000
                    },
                    {
                        name: 'quote',
                        value: '"quote"',
                        path: '/',
                        secure: true
                    },
                    {
                        name: 'iroha',
                        value: '\u3044\u308D\u306F',
                        expires: 'Sat Feb 14 2015 00:00:00 GMT+0900 (JST)'
                    }
                ]);
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(window, 'arguments/0/left/object/object').mock, 'arguments/0/left/object').cookie, 'arguments/0/left') === assert._capt(assert._capt(assert._capt('name=value; Max-Age=1423839600000; Domain=localhost; ' + 'quote="quote"; Path=/; Secure; ', 'arguments/0/right/left/left') + 'iroha=\u3044\u308D\u306F; ', 'arguments/0/right/left') + 'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(window.mock.cookie === \'name=value; Max-Age=1423839600000; Domain=localhost; \' + \'quote="quote"; Path=/; Secure; \' + \'iroha=\u3044\u308D\u306F; \' + \'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)\')',
                    filepath: 'test.js',
                    line: 139
                }));
            });
            it('should set cookie-pair', function () {
                cookie.set('name', 'value', {
                    maxage: '1423839600000',
                    domain: 'localhost'
                });
                cookie.set('quote', '"quote"', {
                    path: '/',
                    secure: true
                });
                cookie.set('iroha', '\u3044\u308D\u306F', { expires: 'Sat Feb 14 2015 00:00:00 GMT+0900 (JST)' });
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(window, 'arguments/0/left/object/object').mock, 'arguments/0/left/object').cookie, 'arguments/0/left') === assert._capt(assert._capt(assert._capt('name=value; Max-Age=1423839600000; Domain=localhost; ' + 'quote=%22quote%22; Path=/; Secure; ', 'arguments/0/right/left/left') + 'iroha=%E3%81%84%E3%82%8D%E3%81%AF; ', 'arguments/0/right/left') + 'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(window.mock.cookie === \'name=value; Max-Age=1423839600000; Domain=localhost; \' + \'quote=%22quote%22; Path=/; Secure; \' + \'iroha=%E3%81%84%E3%82%8D%E3%81%AF; \' + \'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)\')',
                    filepath: 'test.js',
                    line: 160
                }));
            });
            it('should set cookie-pair, raw mode is true', function () {
                cookie.config.raw = true;
                cookie.set('name', 'value', {
                    maxage: '1423839600000',
                    domain: 'localhost'
                });
                cookie.set('quote', '"quote"', {
                    path: '/',
                    secure: true
                });
                cookie.set('iroha', '\u3044\u308D\u306F', { expires: 'Sat Feb 14 2015 00:00:00 GMT+0900 (JST)' });
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(window, 'arguments/0/left/object/object').mock, 'arguments/0/left/object').cookie, 'arguments/0/left') === assert._capt(assert._capt(assert._capt('name=value; Max-Age=1423839600000; Domain=localhost; ' + 'quote="quote"; Path=/; Secure; ', 'arguments/0/right/left/left') + 'iroha=\u3044\u308D\u306F; ', 'arguments/0/right/left') + 'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(window.mock.cookie === \'name=value; Max-Age=1423839600000; Domain=localhost; \' + \'quote="quote"; Path=/; Secure; \' + \'iroha=\u3044\u308D\u306F; \' + \'Expires=Sat Feb 14 2015 00:00:00 GMT+0900 (JST)\')',
                    filepath: 'test.js',
                    line: 183
                }));
            });
            it('can be method chain', function () {
                cookie.set('name1', 'value1').set('name2', 'value2').set('name3', 'value3');
                assert(assert._expr(assert._capt(assert._capt(assert._capt(assert._capt(window, 'arguments/0/left/object/object').mock, 'arguments/0/left/object').cookie, 'arguments/0/left') === assert._capt(assert._capt('name1=value1; ' + 'name2=value2; ', 'arguments/0/right/left') + 'name3=value3', 'arguments/0/right'), 'arguments/0'), {
                    content: 'assert(window.mock.cookie === \'name1=value1; \' + \'name2=value2; \' + \'name3=value3\')',
                    filepath: 'test.js',
                    line: 197
                }));
            });
        });
    });
}.call(this));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiYXNzZXJ0IiwiZGVzY3JpYmUiLCJNb2NrQ29va2llIiwidmFsdWVfIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImJlZm9yZUVhY2giLCJjb29raWUiLCJjb25maWciLCJyYXciLCJ3aW5kb3ciLCJtb2NrIiwiYWZ0ZXJFYWNoIiwiaXQiLCJkZWVwRXF1YWwiLCJfZXhwciIsIl9jYXB0IiwiY29udGVudCIsImZpbGVwYXRoIiwibGluZSIsIm5hbWUiLCJxdW90ZSIsImlyb2hhIiwiZG9tYWluIiwibWF4YWdlIiwicGF0aCIsInNlY3VyZSIsImV4cGlyZXMiLCJjYWxsIl0sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLFlBQVc7QUFBQSxJQUVWLGFBRlU7QUFBQSxJQUlWLElBQUlBLE1BQUEsR0FBUyxLQUFLQSxNQUFsQixDQUpVO0FBQUEsSUFNVkMsUUFBQSxDQUFTLFFBQVQsRUFBbUIsWUFBVztBQUFBLFFBRTVCLFNBQVNDLFVBQVQsR0FBc0I7QUFBQSxZQUNwQixLQUFLQyxNQUFMLEdBQWMsRUFBZCxDQURvQjtBQUFBLFlBR3BCQyxNQUFBLENBQU9DLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsUUFBNUIsRUFBc0M7QUFBQSxnQkFDcENDLEdBQUEsRUFBSyxZQUFXO0FBQUEsb0JBQ2QsT0FBTyxLQUFLSCxNQUFaLENBRGM7QUFBQSxpQkFEb0I7QUFBQSxnQkFJcENJLEdBQUEsRUFBSyxVQUFTQyxLQUFULEVBQWdCO0FBQUEsb0JBQ25CLEtBQUtMLE1BQUwsSUFBZ0IsTUFBS0EsTUFBTCxJQUFlLElBQWYsQ0FBRCxHQUF3QkssS0FBdkMsQ0FEbUI7QUFBQSxpQkFKZTtBQUFBLGFBQXRDLEVBSG9CO0FBQUEsU0FGTTtBQUFBLFFBZTVCUCxRQUFBLENBQVMsUUFBVCxFQUFtQixZQUFXO0FBQUEsWUFFNUJRLFVBQUEsQ0FBVyxZQUFXO0FBQUEsZ0JBQ3BCQyxNQUFBLENBQU9DLE1BQVAsQ0FBY0MsR0FBZCxHQUFvQixLQUFwQixDQURvQjtBQUFBLGdCQUdwQkMsTUFBQSxDQUFPQyxJQUFQLEdBQWMsSUFBSVosVUFBSixFQUFkLENBSG9CO0FBQUEsZ0JBSXBCVyxNQUFBLENBQU9DLElBQVAsQ0FBWUosTUFBWixHQUFxQixZQUFyQixDQUpvQjtBQUFBLGdCQUtwQkcsTUFBQSxDQUFPQyxJQUFQLENBQVlKLE1BQVosR0FBcUIsbUJBQXJCLENBTG9CO0FBQUEsZ0JBTXBCRyxNQUFBLENBQU9DLElBQVAsQ0FBWUosTUFBWixHQUFxQixtQ0FBckIsQ0FOb0I7QUFBQSxhQUF0QixFQUY0QjtBQUFBLFlBVzVCSyxTQUFBLENBQVUsWUFBVztBQUFBLGdCQUNuQixPQUFPRixNQUFBLENBQU9DLElBQWQsQ0FEbUI7QUFBQSxhQUFyQixFQVg0QjtBQUFBLFlBZTVCRSxFQUFBLENBQUcseUJBQUgsRUFBOEIsWUFBVztBQUFBLGdCQUN2Q2hCLE1BQUEsQ0FBT2lCLFNBQVAsQ0FBaUJqQixNQUFBLENBQUFrQixLQUFBLENBQUFsQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFULE1BQUEsK0JBQU9KLEdBQVA7QUFBQSxvQkFBQWMsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBakIsRUFBK0I7QUFBQSxvQkFDN0JDLElBQUEsRUFBTSxPQUR1QjtBQUFBLG9CQUU3QkMsS0FBQSxFQUFPLFNBRnNCO0FBQUEsb0JBRzdCQyxLQUFBLEVBQU8sb0JBSHNCO0FBQUEsaUJBQS9CLEVBRHVDO0FBQUEsYUFBekMsRUFmNEI7QUFBQSxZQXVCNUJULEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxZQUFXO0FBQUEsZ0JBQ3pETixNQUFBLENBQU9DLE1BQVAsQ0FBY0MsR0FBZCxHQUFvQixJQUFwQixDQUR5RDtBQUFBLGdCQUd6RFosTUFBQSxDQUFPaUIsU0FBUCxDQUFpQmpCLE1BQUEsQ0FBQWtCLEtBQUEsQ0FBQWxCLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQVQsTUFBQSwrQkFBT0osR0FBUDtBQUFBLG9CQUFBYyxPQUFBO0FBQUEsb0JBQUFDLFFBQUE7QUFBQSxvQkFBQUMsSUFBQTtBQUFBLGtCQUFqQixFQUErQjtBQUFBLG9CQUM3QkMsSUFBQSxFQUFNLE9BRHVCO0FBQUEsb0JBRTdCQyxLQUFBLEVBQU8sYUFGc0I7QUFBQSxvQkFHN0JDLEtBQUEsRUFBTyw2QkFIc0I7QUFBQSxpQkFBL0IsRUFIeUQ7QUFBQSxhQUEzRCxFQXZCNEI7QUFBQSxZQWlDNUJULEVBQUEsQ0FBRyx5QkFBSCxFQUE4QixZQUFXO0FBQUEsZ0JBQ3ZDaEIsTUFBQSxDQUFPQSxNQUFBLENBQUFrQixLQUFBLENBQUFsQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFULE1BQUEsb0NBQU9KLEdBQVAsQ0FBVyxNQUFYLDJCQUF1QixPQUF2QjtBQUFBLG9CQUFBYyxPQUFBO0FBQUEsb0JBQUFDLFFBQUE7QUFBQSxvQkFBQUMsSUFBQTtBQUFBLGtCQUFQLEVBRHVDO0FBQUEsZ0JBRXZDdEIsTUFBQSxDQUFPQSxNQUFBLENBQUFrQixLQUFBLENBQUFsQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFULE1BQUEsb0NBQU9KLEdBQVAsQ0FBVyxPQUFYLDJCQUF3QixTQUF4QjtBQUFBLG9CQUFBYyxPQUFBO0FBQUEsb0JBQUFDLFFBQUE7QUFBQSxvQkFBQUMsSUFBQTtBQUFBLGtCQUFQLEVBRnVDO0FBQUEsZ0JBR3ZDdEIsTUFBQSxDQUFPQSxNQUFBLENBQUFrQixLQUFBLENBQUFsQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFULE1BQUEsb0NBQU9KLEdBQVAsQ0FBVyxPQUFYLDJCQUF3QixvQkFBeEI7QUFBQSxvQkFBQWMsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBUCxFQUh1QztBQUFBLGFBQXpDLEVBakM0QjtBQUFBLFlBdUM1Qk4sRUFBQSxDQUFHLDJDQUFILEVBQWdELFlBQVc7QUFBQSxnQkFDekROLE1BQUEsQ0FBT0MsTUFBUCxDQUFjQyxHQUFkLEdBQW9CLElBQXBCLENBRHlEO0FBQUEsZ0JBR3pEWixNQUFBLENBQU9BLE1BQUEsQ0FBQWtCLEtBQUEsQ0FBQWxCLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQVQsTUFBQSxvQ0FBT0osR0FBUCxDQUFXLE1BQVgsMkJBQXVCLE9BQXZCO0FBQUEsb0JBQUFjLE9BQUE7QUFBQSxvQkFBQUMsUUFBQTtBQUFBLG9CQUFBQyxJQUFBO0FBQUEsa0JBQVAsRUFIeUQ7QUFBQSxnQkFJekR0QixNQUFBLENBQU9BLE1BQUEsQ0FBQWtCLEtBQUEsQ0FBQWxCLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQVQsTUFBQSxvQ0FBT0osR0FBUCxDQUFXLE9BQVgsMkJBQXdCLGFBQXhCO0FBQUEsb0JBQUFjLE9BQUE7QUFBQSxvQkFBQUMsUUFBQTtBQUFBLG9CQUFBQyxJQUFBO0FBQUEsa0JBQVAsRUFKeUQ7QUFBQSxnQkFLekR0QixNQUFBLENBQU9BLE1BQUEsQ0FBQWtCLEtBQUEsQ0FBQWxCLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQVQsTUFBQSxvQ0FBT0osR0FBUCxDQUFXLE9BQVgsMkJBQXdCLDZCQUF4QjtBQUFBLG9CQUFBYyxPQUFBO0FBQUEsb0JBQUFDLFFBQUE7QUFBQSxvQkFBQUMsSUFBQTtBQUFBLGtCQUFQLEVBTHlEO0FBQUEsYUFBM0QsRUF2QzRCO0FBQUEsWUErQzVCTixFQUFBLENBQUcsK0NBQUgsRUFBb0QsWUFBVztBQUFBLGdCQUM3RGhCLE1BQUEsQ0FBT0EsTUFBQSxDQUFBa0IsS0FBQSxDQUFBbEIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBVCxNQUFBLG9DQUFPSixHQUFQLENBQVcsU0FBWCwyQkFBMEIsSUFBMUI7QUFBQSxvQkFBQWMsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBUCxFQUQ2RDtBQUFBLGFBQS9ELEVBL0M0QjtBQUFBLFNBQTlCLEVBZjRCO0FBQUEsUUFvRTVCckIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsWUFBVztBQUFBLFlBRTVCUSxVQUFBLENBQVcsWUFBVztBQUFBLGdCQUNwQkMsTUFBQSxDQUFPQyxNQUFQLENBQWNDLEdBQWQsR0FBb0IsS0FBcEIsQ0FEb0I7QUFBQSxnQkFHcEJDLE1BQUEsQ0FBT0MsSUFBUCxHQUFjLElBQUlaLFVBQUosRUFBZCxDQUhvQjtBQUFBLGFBQXRCLEVBRjRCO0FBQUEsWUFRNUJhLFNBQUEsQ0FBVSxZQUFXO0FBQUEsZ0JBQ25CLE9BQU9GLE1BQUEsQ0FBT0MsSUFBZCxDQURtQjtBQUFBLGFBQXJCLEVBUjRCO0FBQUEsWUFZNUJFLEVBQUEsQ0FBRyx5QkFBSCxFQUE4QixZQUFXO0FBQUEsZ0JBQ3ZDTixNQUFBLENBQU9ILEdBQVAsQ0FBVztBQUFBLG9CQUNUO0FBQUEsd0JBQ0VnQixJQUFBLEVBQU0sTUFEUjtBQUFBLHdCQUVFZixLQUFBLEVBQU8sT0FGVDtBQUFBLHdCQUdFa0IsTUFBQSxFQUFRLFdBSFY7QUFBQSx3QkFJRUMsTUFBQSxFQUFRLGFBSlY7QUFBQSxxQkFEUztBQUFBLG9CQU9UO0FBQUEsd0JBQ0VKLElBQUEsRUFBTSxPQURSO0FBQUEsd0JBRUVmLEtBQUEsRUFBTyxTQUZUO0FBQUEsd0JBR0VvQixJQUFBLEVBQU0sR0FIUjtBQUFBLHdCQUlFQyxNQUFBLEVBQVEsSUFKVjtBQUFBLHFCQVBTO0FBQUEsb0JBYVQ7QUFBQSx3QkFDRU4sSUFBQSxFQUFNLE9BRFI7QUFBQSx3QkFFRWYsS0FBQSxFQUFPLG9CQUZUO0FBQUEsd0JBR0VzQixPQUFBLEVBQVMseUNBSFg7QUFBQSxxQkFiUztBQUFBLGlCQUFYLEVBRHVDO0FBQUEsZ0JBcUJ2QzlCLE1BQUEsQ0FBT0EsTUFBQSxDQUFBa0IsS0FBQSxDQUFBbEIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBTixNQUFBLG9DQUFPQyxJQUFQLDZCQUFZSixNQUFaLDBCQUNIVixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLDJEQUNBLHFDQURBLG1DQUVBLHFDQUZBLDhCQUdBLGlEQUhBLHNCQURHO0FBQUEsb0JBQUFDLE9BQUE7QUFBQSxvQkFBQUMsUUFBQTtBQUFBLG9CQUFBQyxJQUFBO0FBQUEsa0JBQVAsRUFyQnVDO0FBQUEsYUFBekMsRUFaNEI7QUFBQSxZQXlDNUJOLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxZQUFXO0FBQUEsZ0JBQ3pETixNQUFBLENBQU9DLE1BQVAsQ0FBY0MsR0FBZCxHQUFvQixJQUFwQixDQUR5RDtBQUFBLGdCQUd6REYsTUFBQSxDQUFPSCxHQUFQLENBQVc7QUFBQSxvQkFDVDtBQUFBLHdCQUNFZ0IsSUFBQSxFQUFNLE1BRFI7QUFBQSx3QkFFRWYsS0FBQSxFQUFPLE9BRlQ7QUFBQSx3QkFHRWtCLE1BQUEsRUFBUSxXQUhWO0FBQUEsd0JBSUVDLE1BQUEsRUFBUSxhQUpWO0FBQUEscUJBRFM7QUFBQSxvQkFPVDtBQUFBLHdCQUNFSixJQUFBLEVBQU0sT0FEUjtBQUFBLHdCQUVFZixLQUFBLEVBQU8sU0FGVDtBQUFBLHdCQUdFb0IsSUFBQSxFQUFNLEdBSFI7QUFBQSx3QkFJRUMsTUFBQSxFQUFRLElBSlY7QUFBQSxxQkFQUztBQUFBLG9CQWFUO0FBQUEsd0JBQ0VOLElBQUEsRUFBTSxPQURSO0FBQUEsd0JBRUVmLEtBQUEsRUFBTyxvQkFGVDtBQUFBLHdCQUdFc0IsT0FBQSxFQUFTLHlDQUhYO0FBQUEscUJBYlM7QUFBQSxpQkFBWCxFQUh5RDtBQUFBLGdCQXVCekQ5QixNQUFBLENBQU9BLE1BQUEsQ0FBQWtCLEtBQUEsQ0FBQWxCLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQU4sTUFBQSxvQ0FBT0MsSUFBUCw2QkFBWUosTUFBWiwwQkFDSFYsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSwyREFDQSxpQ0FEQSxtQ0FFQSw0QkFGQSw4QkFHQSxpREFIQSxzQkFERztBQUFBLG9CQUFBQyxPQUFBO0FBQUEsb0JBQUFDLFFBQUE7QUFBQSxvQkFBQUMsSUFBQTtBQUFBLGtCQUFQLEVBdkJ5RDtBQUFBLGFBQTNELEVBekM0QjtBQUFBLFlBd0U1Qk4sRUFBQSxDQUFHLHdCQUFILEVBQTZCLFlBQVc7QUFBQSxnQkFDdENOLE1BQUEsQ0FBT0gsR0FBUCxDQUFXLE1BQVgsRUFBbUIsT0FBbkIsRUFBNEI7QUFBQSxvQkFDMUJvQixNQUFBLEVBQVEsZUFEa0I7QUFBQSxvQkFFMUJELE1BQUEsRUFBUSxXQUZrQjtBQUFBLGlCQUE1QixFQURzQztBQUFBLGdCQUt0Q2hCLE1BQUEsQ0FBT0gsR0FBUCxDQUFXLE9BQVgsRUFBb0IsU0FBcEIsRUFBK0I7QUFBQSxvQkFDN0JxQixJQUFBLEVBQU0sR0FEdUI7QUFBQSxvQkFFN0JDLE1BQUEsRUFBUSxJQUZxQjtBQUFBLGlCQUEvQixFQUxzQztBQUFBLGdCQVN0Q25CLE1BQUEsQ0FBT0gsR0FBUCxDQUFXLE9BQVgsRUFBb0Isb0JBQXBCLEVBQTJCLEVBQ3pCdUIsT0FBQSxFQUFTLHlDQURnQixFQUEzQixFQVRzQztBQUFBLGdCQWF0QzlCLE1BQUEsQ0FBT0EsTUFBQSxDQUFBa0IsS0FBQSxDQUFBbEIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBTixNQUFBLG9DQUFPQyxJQUFQLDZCQUFZSixNQUFaLDBCQUNIVixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLDJEQUNBLHFDQURBLG1DQUVBLHFDQUZBLDhCQUdBLGlEQUhBLHNCQURHO0FBQUEsb0JBQUFDLE9BQUE7QUFBQSxvQkFBQUMsUUFBQTtBQUFBLG9CQUFBQyxJQUFBO0FBQUEsa0JBQVAsRUFic0M7QUFBQSxhQUF4QyxFQXhFNEI7QUFBQSxZQTZGNUJOLEVBQUEsQ0FBRywwQ0FBSCxFQUErQyxZQUFXO0FBQUEsZ0JBQ3hETixNQUFBLENBQU9DLE1BQVAsQ0FBY0MsR0FBZCxHQUFvQixJQUFwQixDQUR3RDtBQUFBLGdCQUd4REYsTUFBQSxDQUFPSCxHQUFQLENBQVcsTUFBWCxFQUFtQixPQUFuQixFQUE0QjtBQUFBLG9CQUMxQm9CLE1BQUEsRUFBUSxlQURrQjtBQUFBLG9CQUUxQkQsTUFBQSxFQUFRLFdBRmtCO0FBQUEsaUJBQTVCLEVBSHdEO0FBQUEsZ0JBT3hEaEIsTUFBQSxDQUFPSCxHQUFQLENBQVcsT0FBWCxFQUFvQixTQUFwQixFQUErQjtBQUFBLG9CQUM3QnFCLElBQUEsRUFBTSxHQUR1QjtBQUFBLG9CQUU3QkMsTUFBQSxFQUFRLElBRnFCO0FBQUEsaUJBQS9CLEVBUHdEO0FBQUEsZ0JBV3hEbkIsTUFBQSxDQUFPSCxHQUFQLENBQVcsT0FBWCxFQUFvQixvQkFBcEIsRUFBMkIsRUFDekJ1QixPQUFBLEVBQVMseUNBRGdCLEVBQTNCLEVBWHdEO0FBQUEsZ0JBZXhEOUIsTUFBQSxDQUFPQSxNQUFBLENBQUFrQixLQUFBLENBQUFsQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLENBQUFOLE1BQUEsb0NBQU9DLElBQVAsNkJBQVlKLE1BQVosMEJBQ0hWLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsQ0FBQW5CLE1BQUEsQ0FBQW1CLEtBQUEsMkRBQ0EsaUNBREEsbUNBRUEsNEJBRkEsOEJBR0EsaURBSEEsc0JBREc7QUFBQSxvQkFBQUMsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBUCxFQWZ3RDtBQUFBLGFBQTFELEVBN0Y0QjtBQUFBLFlBb0g1Qk4sRUFBQSxDQUFHLHFCQUFILEVBQTBCLFlBQVc7QUFBQSxnQkFDbkNOLE1BQUEsQ0FDR0gsR0FESCxDQUNPLE9BRFAsRUFDZ0IsUUFEaEIsRUFFR0EsR0FGSCxDQUVPLE9BRlAsRUFFZ0IsUUFGaEIsRUFHR0EsR0FISCxDQUdPLE9BSFAsRUFHZ0IsUUFIaEIsRUFEbUM7QUFBQSxnQkFNbkNQLE1BQUEsQ0FBT0EsTUFBQSxDQUFBa0IsS0FBQSxDQUFBbEIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBbkIsTUFBQSxDQUFBbUIsS0FBQSxDQUFBTixNQUFBLG9DQUFPQyxJQUFQLDZCQUFZSixNQUFaLDBCQUNIVixNQUFBLENBQUFtQixLQUFBLENBQUFuQixNQUFBLENBQUFtQixLQUFBLG9CQUNBLGdCQURBLDhCQUVBLGNBRkEsc0JBREc7QUFBQSxvQkFBQUMsT0FBQTtBQUFBLG9CQUFBQyxRQUFBO0FBQUEsb0JBQUFDLElBQUE7QUFBQSxrQkFBUCxFQU5tQztBQUFBLGFBQXJDLEVBcEg0QjtBQUFBLFNBQTlCLEVBcEU0QjtBQUFBLEtBQTlCLEVBTlU7QUFBQSxDQUFaLENBK01HUyxJQS9NSCxDQStNUSxJQS9NUiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGFzc2VydCA9IHRoaXMuYXNzZXJ0O1xuXG4gIGRlc2NyaWJlKCdjb29raWUnLCBmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uIE1vY2tDb29raWUoKSB7XG4gICAgICB0aGlzLnZhbHVlXyA9ICcnO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2Nvb2tpZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlXyArPSAodGhpcy52YWx1ZV8gJiYgJzsgJykgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJy5nZXQoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb29raWUuY29uZmlnLnJhdyA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5tb2NrID0gbmV3IE1vY2tDb29raWU7XG4gICAgICAgIHdpbmRvdy5tb2NrLmNvb2tpZSA9ICduYW1lPXZhbHVlJztcbiAgICAgICAgd2luZG93Lm1vY2suY29va2llID0gJ3F1b3RlPSUyMnF1b3RlJTIyJztcbiAgICAgICAgd2luZG93Lm1vY2suY29va2llID0gJ2lyb2hhPSVFMyU4MSU4NCVFMyU4MiU4RCVFMyU4MSVBRic7XG4gICAgICB9KTtcblxuICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWxldGUgd2luZG93Lm1vY2s7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBnb3QgY29va2llLXBhaXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29va2llLmdldCgpLCB7XG4gICAgICAgICAgbmFtZTogJ3ZhbHVlJyxcbiAgICAgICAgICBxdW90ZTogJ1wicXVvdGVcIicsXG4gICAgICAgICAgaXJvaGE6ICfjgYTjgo3jga8nXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgZ290IGNvb2tpZS1wYWlycywgcmF3IG1vZGUgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb29raWUuY29uZmlnLnJhdyA9IHRydWU7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjb29raWUuZ2V0KCksIHtcbiAgICAgICAgICBuYW1lOiAndmFsdWUnLFxuICAgICAgICAgIHF1b3RlOiAnJTIycXVvdGUlMjInLFxuICAgICAgICAgIGlyb2hhOiAnJUUzJTgxJTg0JUUzJTgyJThEJUUzJTgxJUFGJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGdvdCBjb29raWUtdmFsdWUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0KGNvb2tpZS5nZXQoJ25hbWUnKSA9PT0gJ3ZhbHVlJyk7XG4gICAgICAgIGFzc2VydChjb29raWUuZ2V0KCdxdW90ZScpID09PSAnXCJxdW90ZVwiJyk7XG4gICAgICAgIGFzc2VydChjb29raWUuZ2V0KCdpcm9oYScpID09PSAn44GE44KN44GvJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBnb3QgY29va2llLXZhbHVlLCByYXcgbW9kZSBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvb2tpZS5jb25maWcucmF3ID0gdHJ1ZTtcblxuICAgICAgICBhc3NlcnQoY29va2llLmdldCgnbmFtZScpID09PSAndmFsdWUnKTtcbiAgICAgICAgYXNzZXJ0KGNvb2tpZS5nZXQoJ3F1b3RlJykgPT09ICclMjJxdW90ZSUyMicpO1xuICAgICAgICBhc3NlcnQoY29va2llLmdldCgnaXJvaGEnKSA9PT0gJyVFMyU4MSU4NCVFMyU4MiU4RCVFMyU4MSVBRicpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgZ290IG51bGwgd2hlbiBjb29raWUtbmFtZSBpcyBub3QgZm91bmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0KGNvb2tpZS5nZXQoJ3Vua25vd24nKSA9PT0gbnVsbCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJy5zZXQoKScsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb29raWUuY29uZmlnLnJhdyA9IGZhbHNlO1xuXG4gICAgICAgIHdpbmRvdy5tb2NrID0gbmV3IE1vY2tDb29raWU7XG4gICAgICB9KTtcblxuICAgICAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWxldGUgd2luZG93Lm1vY2s7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBzZXQgY29va2llLXBhaXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvb2tpZS5zZXQoW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgICAgICAgIHZhbHVlOiAndmFsdWUnLFxuICAgICAgICAgICAgZG9tYWluOiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgIG1heGFnZTogMTQyMzgzOTYwMDAwMFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3F1b3RlJyxcbiAgICAgICAgICAgIHZhbHVlOiAnXCJxdW90ZVwiJyxcbiAgICAgICAgICAgIHBhdGg6ICcvJyxcbiAgICAgICAgICAgIHNlY3VyZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2lyb2hhJyxcbiAgICAgICAgICAgIHZhbHVlOiAn44GE44KN44GvJyxcbiAgICAgICAgICAgIGV4cGlyZXM6ICdTYXQgRmViIDE0IDIwMTUgMDA6MDA6MDAgR01UKzA5MDAgKEpTVCknXG4gICAgICAgICAgfVxuICAgICAgICBdKTtcblxuICAgICAgICBhc3NlcnQod2luZG93Lm1vY2suY29va2llID09PVxuICAgICAgICAgICAgJ25hbWU9dmFsdWU7IE1heC1BZ2U9MTQyMzgzOTYwMDAwMDsgRG9tYWluPWxvY2FsaG9zdDsgJyArXG4gICAgICAgICAgICAncXVvdGU9JTIycXVvdGUlMjI7IFBhdGg9LzsgU2VjdXJlOyAnICtcbiAgICAgICAgICAgICdpcm9oYT0lRTMlODElODQlRTMlODIlOEQlRTMlODElQUY7ICcgK1xuICAgICAgICAgICAgJ0V4cGlyZXM9U2F0IEZlYiAxNCAyMDE1IDAwOjAwOjAwIEdNVCswOTAwIChKU1QpJ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgc2V0IGNvb2tpZS1wYWlycywgcmF3IG1vZGUgaXMgdHJ1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb29raWUuY29uZmlnLnJhdyA9IHRydWU7XG5cbiAgICAgICAgY29va2llLnNldChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgdmFsdWU6ICd2YWx1ZScsXG4gICAgICAgICAgICBkb21haW46ICdsb2NhbGhvc3QnLFxuICAgICAgICAgICAgbWF4YWdlOiAxNDIzODM5NjAwMDAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncXVvdGUnLFxuICAgICAgICAgICAgdmFsdWU6ICdcInF1b3RlXCInLFxuICAgICAgICAgICAgcGF0aDogJy8nLFxuICAgICAgICAgICAgc2VjdXJlOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaXJvaGEnLFxuICAgICAgICAgICAgdmFsdWU6ICfjgYTjgo3jga8nLFxuICAgICAgICAgICAgZXhwaXJlczogJ1NhdCBGZWIgMTQgMjAxNSAwMDowMDowMCBHTVQrMDkwMCAoSlNUKSdcbiAgICAgICAgICB9XG4gICAgICAgIF0pO1xuXG4gICAgICAgIGFzc2VydCh3aW5kb3cubW9jay5jb29raWUgPT09XG4gICAgICAgICAgICAnbmFtZT12YWx1ZTsgTWF4LUFnZT0xNDIzODM5NjAwMDAwOyBEb21haW49bG9jYWxob3N0OyAnICtcbiAgICAgICAgICAgICdxdW90ZT1cInF1b3RlXCI7IFBhdGg9LzsgU2VjdXJlOyAnICtcbiAgICAgICAgICAgICdpcm9oYT3jgYTjgo3jga87ICcgK1xuICAgICAgICAgICAgJ0V4cGlyZXM9U2F0IEZlYiAxNCAyMDE1IDAwOjAwOjAwIEdNVCswOTAwIChKU1QpJ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgc2V0IGNvb2tpZS1wYWlyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvb2tpZS5zZXQoJ25hbWUnLCAndmFsdWUnLCB7XG4gICAgICAgICAgbWF4YWdlOiAnMTQyMzgzOTYwMDAwMCcsXG4gICAgICAgICAgZG9tYWluOiAnbG9jYWxob3N0J1xuICAgICAgICB9KTtcbiAgICAgICAgY29va2llLnNldCgncXVvdGUnLCAnXCJxdW90ZVwiJywge1xuICAgICAgICAgIHBhdGg6ICcvJyxcbiAgICAgICAgICBzZWN1cmU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIGNvb2tpZS5zZXQoJ2lyb2hhJywgJ+OBhOOCjeOBrycsIHtcbiAgICAgICAgICBleHBpcmVzOiAnU2F0IEZlYiAxNCAyMDE1IDAwOjAwOjAwIEdNVCswOTAwIChKU1QpJ1xuICAgICAgICB9KTtcblxuICAgICAgICBhc3NlcnQod2luZG93Lm1vY2suY29va2llID09PVxuICAgICAgICAgICAgJ25hbWU9dmFsdWU7IE1heC1BZ2U9MTQyMzgzOTYwMDAwMDsgRG9tYWluPWxvY2FsaG9zdDsgJyArXG4gICAgICAgICAgICAncXVvdGU9JTIycXVvdGUlMjI7IFBhdGg9LzsgU2VjdXJlOyAnICtcbiAgICAgICAgICAgICdpcm9oYT0lRTMlODElODQlRTMlODIlOEQlRTMlODElQUY7ICcgK1xuICAgICAgICAgICAgJ0V4cGlyZXM9U2F0IEZlYiAxNCAyMDE1IDAwOjAwOjAwIEdNVCswOTAwIChKU1QpJ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgc2V0IGNvb2tpZS1wYWlyLCByYXcgbW9kZSBpcyB0cnVlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvb2tpZS5jb25maWcucmF3ID0gdHJ1ZTtcblxuICAgICAgICBjb29raWUuc2V0KCduYW1lJywgJ3ZhbHVlJywge1xuICAgICAgICAgIG1heGFnZTogJzE0MjM4Mzk2MDAwMDAnLFxuICAgICAgICAgIGRvbWFpbjogJ2xvY2FsaG9zdCdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvb2tpZS5zZXQoJ3F1b3RlJywgJ1wicXVvdGVcIicsIHtcbiAgICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgICAgc2VjdXJlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBjb29raWUuc2V0KCdpcm9oYScsICfjgYTjgo3jga8nLCB7XG4gICAgICAgICAgZXhwaXJlczogJ1NhdCBGZWIgMTQgMjAxNSAwMDowMDowMCBHTVQrMDkwMCAoSlNUKSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXNzZXJ0KHdpbmRvdy5tb2NrLmNvb2tpZSA9PT1cbiAgICAgICAgICAgICduYW1lPXZhbHVlOyBNYXgtQWdlPTE0MjM4Mzk2MDAwMDA7IERvbWFpbj1sb2NhbGhvc3Q7ICcgK1xuICAgICAgICAgICAgJ3F1b3RlPVwicXVvdGVcIjsgUGF0aD0vOyBTZWN1cmU7ICcgK1xuICAgICAgICAgICAgJ2lyb2hhPeOBhOOCjeOBrzsgJyArXG4gICAgICAgICAgICAnRXhwaXJlcz1TYXQgRmViIDE0IDIwMTUgMDA6MDA6MDAgR01UKzA5MDAgKEpTVCknXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbiBiZSBtZXRob2QgY2hhaW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29va2llXG4gICAgICAgICAgLnNldCgnbmFtZTEnLCAndmFsdWUxJylcbiAgICAgICAgICAuc2V0KCduYW1lMicsICd2YWx1ZTInKVxuICAgICAgICAgIC5zZXQoJ25hbWUzJywgJ3ZhbHVlMycpO1xuXG4gICAgICAgIGFzc2VydCh3aW5kb3cubW9jay5jb29raWUgPT09XG4gICAgICAgICAgICAnbmFtZTE9dmFsdWUxOyAnICtcbiAgICAgICAgICAgICduYW1lMj12YWx1ZTI7ICcgK1xuICAgICAgICAgICAgJ25hbWUzPXZhbHVlMydcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iXX0=

