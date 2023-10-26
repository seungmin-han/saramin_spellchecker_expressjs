const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const content = req.query.content;
    console.log(req.query.content);
    axios.get('https://www.saramin.co.kr/zf_user/tools/spell-check', { params: { content } }).then(r => {
        res.send(r.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})