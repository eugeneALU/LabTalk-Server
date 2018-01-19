const express = require('express');
const calendarRouter = require('./routers/calendar.js');
const accountRouter = require('./routers/account.js');
const chatRouter = require('./routers/chat.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));

app.use('/api', accountRouter);
app.use('/api', chatRouter);
app.use('/api', calendarRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
