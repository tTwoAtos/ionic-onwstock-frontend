import dataclasses
import subprocess


@dataclasses
class IonicAppBuilder:
    @staticmethod
    def build_ionic(self):
        """
        A method to build an ionic app.
        """
        print("Building ionic app")
        subprocess.run(["npx", "ionic", "build"], shell=True)

    @staticmethod
    def sync_android():
        """
        A static method to sync with Android Studio.
        """
        print("Syncing with Android Studio")
        subprocess.run(["npx", "cap", "sync"], shell=True)

    @classmethod
    def build_runner(cls):
        """
        Class method to build a runner, invoking the IonicAppBuilder to build an ionic app and sync with Android.
        """
        print("Building runner")
        IonicAppBuilder.build_ionic()
        IonicAppBuilder.sync_android()

def main():
    ionic_builder = IonicAppBuilder()
    ionic_builder.build_runner()

if __name__ == "__main__":
    main()