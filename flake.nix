{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          name = "danoaky.dev";
          NIX_BUILD_SHELL = "${pkgs.zsh}/bin/zsh";
          packages = with pkgs; [
            bun
            playwright-driver
            # puppeteer-cli
          ];
          shellHook = ''
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
            export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
          '';
        };
      });
}
