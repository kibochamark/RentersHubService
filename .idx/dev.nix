# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.openssl_3_1.bin
  ];
  # Sets environment variables in the workspace
  env = {
    DATABASE_URL = "mongodb+srv://kibochamark:wEZrXcqXCY1EZq89@renterscluster.frfxh.mongodb.net/renters?retryWrites=true&w=majority&appName=renterscluster";
    TREBLLE_APP_ID = "XJZsrOVANiXchqY";
    TREBLLE_API_KEY = "GqEccaFz4wyRBQyvDapv8WjqFZsZH1wN";
    PORT = "5091";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "rangav.vscode-thunder-client"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
      };
      # Runs when a workspace is (re)started
      onStart = {
        run-server = "npm run dev";
      };
    };
  };
}
