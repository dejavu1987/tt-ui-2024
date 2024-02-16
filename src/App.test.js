import nightmare from 'nightmare';
import url from 'url';

const BASE_URL = url.format({
  protocol : process.env.PROTOCOL || 'http',
  hostname : process.env.HOST || 'localhost',
  port     : process.env.PORT || 3000
})

describe('When visiting the homepage', function () {

  test('it shows Latest Match', async function () {
    let page = nightmare().goto(BASE_URL);

    let text = await page.evaluate(() => document.body.textContent)
      .end();

    expect(text).toContain('Latest Match');
  })

})
