import { getAccessToken } from '../app/lib/spotify';
import axios from 'axios';
import { assert, expect } from 'chai';


describe('getAccessToken', () => {

    let refreshToken: string;

    before(() => {
        refreshToken = process.env.TESTING_REFRESH_TOKEN as string
    })


    it('should return a valid access token', async () => {
        const accessToken = await getAccessToken(refreshToken)
        assert.isString(accessToken, 'access token is not a string')

        const response = await axios.get('https://api.spotify.com/v1/me/shows?offset=0&limit=1', { headers: { Authorization: `Bearer ${accessToken}` } })
        assert.strictEqual(response.status, 200, "Access token is not valid")
    })
})