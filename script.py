from dataclasses import dataclass
import subprocess

@dataclass
class IonicAppBuilder:
    @staticmethod
    def build_ionic():
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

    @staticmethod
    def open_android():
        """
        A static method to open Android Studio.
        """
        print("Opening Android Studio")
        subprocess.run(["npx", "cap", "open", "android"], shell=True)

    @classmethod
    def build_runner(cls):
        """
        Class method to build a runner, invoking the IonicAppBuilder to build an ionic app and sync with Android.
        """
        print("Building runner")
        IonicAppBuilder.build_ionic()
        IonicAppBuilder.sync_android()
        IonicAppBuilder.open_android()

def main():
    ionic_builder = IonicAppBuilder()
    ionic_builder.build_runner()

if __name__ == "__main__":
    main()