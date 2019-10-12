module.exports = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset = "utf-8">
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <title>Koa Sercer HTML</title>
    </head>
    <body>
      <div class="wrapper">
        <div></div>
        <div class="row"><%= me %></div>
        <div class="row"><%= you %></div>
      </div>
    </body>
  </html>
`