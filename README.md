# Build the project

`npm i`

# Run the project locally

`npm start`

This device: localhost:3000

Other devices: 192.168.x.x:3000.

> Find the address by running `ipconfig`

# Build for prod deployment

To create a production build, use `npm run build`

This generates build files in the build folder.

When built, you may serve it with a static server (I haven't ran this yet, the instructions come from the output from the build):

```
  npm install -g serve
  serve -s build
```
