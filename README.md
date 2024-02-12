# Installation requisites
Before you can run your application, you have to follow some steps.
Steps are designated to be applicable only under Linux like configs.
Please read how to do the same under Windows.

## Sets environment variables

`export ANDROID_SDK_ROOT="path_to_android_sdk`

`export JAVA_HOME="path_to_java_home`


`export CAPACITOR_ANDROID_STUDIO_PATH="path_to_android_studio"`

One it's done, you can source your shell :

`source ~/.bashrc`

Under Windows, use Configuration Panel, to sets these variables.

## Check ADB devices

`adb devices`

After connecting your device with USB cable, enable USB Debug from 'Developer options' menu of your device.

## Debug with Chrome

Run :
`npx cap run android`

You'll be prompted to choose one of the devices, select your physical device.

Open Google Chrome then in a new tab, type :

`chrome://inspect#devices`

You'll find your device instance, then click 'inspect'

At the first button click, you'll be prompted to accept camera usage. Click Yes...

Next, Google Module will be installed.

Terminate processus and reload, you'll be able to scan barcodes.