from dataclasses import dataclass
import subprocess

@dataclass
class DockerRefresh:
    @staticmethod
    def refresh_docker():
        """
        Refreshes the Docker container by restarting the Docker Compose service.
        """
        print("Refreshing Docker container")
        subprocess.run(["docker", "compose", "restart"], shell=True)

    @classmethod
    def refresh_runner(cls):
        """
        Refreshes the runner by restarting the server and refreshing the Docker.
        """
        print("Restart Server")
        DockerRefresh.refresh_docker()


def main():
    refresh = DockerRefresh()
    refresh.refresh_runner()

if __name__ == "__main__":
    main()