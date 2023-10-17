import * as user from '../user'

describe('user Handler', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: "hello", 
                password: "world"
            }
        }
        const res = {
            json({token}) {
                expect(token).toBeTruthy();
            }
        }
        const newUser = await user.createNewUser(req, res, () => {});
    })
})