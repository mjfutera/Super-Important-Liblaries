const cornerBanner = () => {
        const styles = document.createElement('link');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', 'https://important.michalfutera.pro/cornerBanner/style.css');
        document.head.appendChild(styles);

        const banner = document.createElement('img');
        banner.setAttribute('src', 'https://important.michalfutera.pro/cornerBanner/bmc-corner.png');
        banner.setAttribute('class', 'cornerBanner-bmc-mfpro');
      
        const link = document.createElement('a');
        link.setAttribute('href', 'https://www.buymeacoffee.com/mjfutera');
        link.setAttribute('target', '_blank');

        link.appendChild(banner);
        document.body.appendChild(link);
}

window.addEventListener("load", () => {
        cornerBanner();
})