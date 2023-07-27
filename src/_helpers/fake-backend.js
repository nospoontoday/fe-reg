import CryptoJS from 'crypto-js';

function fakeBackend() {
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/api/register') && opts.method === 'POST':
                        return register();
                    default:
                        return register();
                }
            }

            // route functions: pretend https endpoint as per required
            function register() {
                // encryption should be done here.
                const user = body();
                const encryptedUser = {};
                const secret = `${process.env.REACT_APP_SECRET}`;

                // Encrypt each field
                for (let [key, value] of Object.entries(user)) {
                    const strValue = typeof value === 'string' ? value : String(value);
                    encryptedUser[key] = CryptoJS.AES.encrypt(strValue, secret).toString();
                }

                //save to db logic here

                console.log('Encrypted:', encryptedUser);
                console.log("FAKE BAKEND", user);

                return ok();
            }

            // helper functions
            function ok() {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve() })
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }
        });
    }
}

export { fakeBackend };