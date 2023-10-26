const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const content = req.query.content;
    axios.get('https://www.saramin.co.kr/zf_user/tools/spell-check', { params: { content } }).then(r => {
        const { original_text, word_list, result_cnt } = r.data;
        let editedText = original_text;

        let wrong_list = word_list.map(v => {
            editedText = editedText.replaceAll(v.errorWord, v.candWordList);
            return { errorWord: v.errorWord, editedWord: v.candWordList };
        })

        res.send({original_text, editedText, wrong_list, wrong_cnt: result_cnt});
    }).catch(err => {
        res.send(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})