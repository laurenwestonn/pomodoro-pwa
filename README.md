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

> the above is apparently how you "serve your PWA locally", which should let you test offline functionality locally. This was an optional step in "how to get the pwa on my phone working offline"

# Differences between local (start) and server (serve)

Server serves from build folder files. Any code changes wont be reflected unless you regenerate those build files with a... build.

So of course no hot reloading.

Serve is optimised for serving static files. Lightweight.

# How to get the app to work offline / Service Worker

## Setup

Assuming you created an app using the helper `npx create-react-app my-app --template cra-template-pwa-typescript`:

Changing unregister to register in your src/index.tsx is all you need to do to cache all the files you need. It'll auto use workbox to grab the files you need. The only files it doesn't grab is stuff from the public folder. Static stuff like images

You don't need to set up event listeners for `install`, `fetch`, and `activate`, or compile a list of URLS to include in the cache. I think this was needed before react-app used workbox, so older tutorials will mention it.

## Test for offline - localhost

Build for prod deployment. Now you can visit localhost:3000 on this machine. In dev tools > application tab > service workers, you should see an active one. Green circle, "active". Check reload service work on refresh. You can keep this checked the whole time. I'm not sure why.

Check Offline within that same tab.

> This is the same as the Network tab's throttling setting

Refresh the page. This is the same as visiting the app without a wifi connection. The console should also log that it's loading an offline version.

## Test for offline - mobile

Service workers require HTTPS, unless you're on the machine where the server is running, and can therefore visit via `localhost`. To view the app on your phone you must go to the IP address url. This isn't localhost.

You can't view localhost on your phone. Therefore to use a service worker on your phone - aka have offline support - you must set up HTTPS.

This is done by generating a SSL certificate

## Make SSL Certificate

Follow online tutorials but for me it involved opening git bash and running openssl commands to generate 2 files

- myCA.key
- myCA.pem

## Add certificates to your machine

run `mmc`. Add it in there

## Add cert to your phone

Email those files to yourself, download to phone and install via settings.

#######################
