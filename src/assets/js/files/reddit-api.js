import jsonp from 'jsonp'


class RedditApi {
  constructor() {
    this.redditURL = "https://www.reddit.com/r/perfectloops/top.json?sort=top&t=week"
  }
  load() {
    jsonp(this.redditURL, {params: 'jsonp'}, (err, data) => {
      console.log(data)
    })
  }
}

export default new RedditApi();
