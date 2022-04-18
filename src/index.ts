import environment from './environment';
import app from './server';

app.listen(environment.port, () => {
    console.log(`Server is running on port: ${environment.port}`);
});
