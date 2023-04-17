// Corner banner
// By Michal Futera
// https://linktr.ee/mjfutera
// v. 1.000

const url = 'https://important.michalfutera.pro/cornerBanner';

const data = [
        {
                'link': 'https://buymeacoffee.com/mjfutera',
                'banner': 'buyMeACoffee',
                'alt': 'Like my project? Buy me a coffe',
                'animation': true
        },
        {
                'link': 'https://www.fiverr.com/michalfutera',
                'banner': 'fiverr',
                'alt': 'Want me to code for You? Here You can check my services',
                'animation': false
        },
        {
                'link': 'https://github.com/mjfutera',
                'banner': 'gitHub',
                'alt': 'Check My coding portfolio',
                'animation': false
        },
        {
                'link': 'https://www.linkedin.com/in/michalfutera/',
                'banner': 'linkedIn',
                'alt': 'My LinkedIn profile',
                'animation': false
        },
        {
                'link': 'https://linktr.ee/mjfutera',
                'banner': 'linkTree',
                'alt': 'All my links in one place. Feel free and check me',
                'animation': false
        },
        {
                'link': 'https://michalfutera.pro',
                'banner': 'myBlog',
                'alt': 'Check my Blog',
                'animation': false
        },
        {
                'link': 'https://twitter.com/mjfutera',
                'banner': 'twitter',
                'alt': 'Follow me on Twitter',
                'animation': false
        },
        {
                'link': 'https://mjfutera.medium.com/',
                'banner': 'medium',
                'alt': 'Check my posts',
                'animation': false
        }
]

const randomBanner = () => Math.floor(Math.random() * (data.length));

const bannerAttributes = (banner, link) => {
        const id = randomBanner();
        
        banner.setAttribute('src', `${url}/img/${data[id].banner}.png`);
        if (data[id].animation) {
                banner.setAttribute('class', 'cornerBanner-mfpro cornerBanner-animation-mfpro');
        } else {
                banner.setAttribute('class', 'cornerBanner-mfpro');
        }
        banner.setAttribute('alt', data[id].alt);
      
        link.setAttribute('href', data[id].link);
        link.setAttribute('alt', data[id].alt);
        link.setAttribute('target', '_blank');

        link.appendChild(banner);
        console.log(`Refresh banner. Banner id is ${data[id].banner}`);
}

const setBannerAtributes = (banner, link) => {
        setTimeout(() => {
                setBannerAtributes(banner, link);
                bannerAttributes(banner, link);
        }, 10000)
}

const createElements = () => {
        const styles = document.createElement('link');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', `${url}/style.css`);
        document.head.appendChild(styles);

        const banner = document.createElement('img');
        const link = document.createElement('a');
        bannerAttributes(banner, link);
        setBannerAtributes(banner, link);
        document.body.appendChild(link);
}

window.addEventListener("load", () => {
        createElements();
})