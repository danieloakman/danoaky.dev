{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    # Pin playwright-driver to match package.json (@playwright/test / playwright-core).
    # Bump this commit when bumping those npm deps — see pkgs/development/web/playwright in nixpkgs.
    # 6959e56 = playwright: 1.61.1 -> 1.62.1
    nixpkgs-playwright.url = "github:NixOS/nixpkgs/6959e56fb649818335ef46fbb6c695d47587caff";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nixpkgs-playwright, flake-utils }:
    # nixos-unstable dropped x86_64-darwin; don't evaluate it via eachDefaultSystem.
    flake-utils.lib.eachSystem [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" ] (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pkgs-playwright = nixpkgs-playwright.legacyPackages.${system};

        # Keep in sync with package.json (@playwright/test, playwright-core).
        playwrightVersion = "1.62.1";
      in
      assert pkgs-playwright.playwright-driver.version == playwrightVersion;
      {
        devShells.default = pkgs.mkShell {
          name = "danoaky.dev";
          NIX_BUILD_SHELL = "${pkgs.zsh}/bin/zsh";
          packages = with pkgs; [
            bun
            pkgs-playwright.playwright-driver
          ];
          shellHook = ''
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
            export PLAYWRIGHT_BROWSERS_PATH=${pkgs-playwright.playwright-driver.browsers}
          '';
        };
      });
}
