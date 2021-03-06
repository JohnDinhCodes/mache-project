import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints'

class NavBar {
    constructor() {
        this.navBar = document.querySelector('.nav-bar')
        this.navBarLinks = this.navBar.querySelectorAll('a')
        this.pageSections = document.querySelectorAll('.page-section')
        this.fixedNavBarTrigger = document.querySelector('#about-us')
        this.menuIcon = document.querySelector('.nav-bar__menu-icon')
        this.mediaMedium = window.matchMedia("(min-width: 800px")
        this.fixedNav()
        this.toggleMenu()
        this.activateLinks()
    }

    fixedNav() {
        new Waypoint({
            element: this.fixedNavBarTrigger,
            handler: (direction) => {
                if (direction === 'down') {
                    this.navBar.classList.add('nav-bar--fixed')
                } else {
                    this.navBar.classList.remove('nav-bar--fixed')
                }
            }
        })
    }

    toggleMenu() {
        this.menuIcon.addEventListener('click', () => {
            if(document.querySelector('.nav-bar__menu-icon--close-x')) {
                this.closeMenu()
            } else {
                this.openMenu()
            }
        })
        this.closeMenuOnClick()
    }

    openMenu() {
        this.menuIcon.classList.add('nav-bar__menu-icon--close-x')
        this.navBar.querySelector('ul').style.left = 0
        this.navBar.querySelector('ul').style.right = 0
        this.navBar.style.overflow = 'visible'
    }

    closeMenu() {
        this.menuIcon.classList.remove('nav-bar__menu-icon--close-x')
        // if (this.mediaMedium.matches) {
            this.navBar.querySelector('ul').style.left = '100vw'
            this.navBar.querySelector('ul').style.right = '-100vw'
        // }
        window.setTimeout(() => {
        this.navBar.style.overflow = 'hidden'
        }, 1000)
    }

    closeMenuOnClick() {
        this.navBarLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu()
            })
        })
    }

    activateLinks() {
        this.pageSections.forEach(pageSection => {
            new Waypoint({
                element: pageSection,
                handler: (direction) => {
                    if (direction === 'down') {
                        let matchingHeaderLink = pageSection.getAttribute('data-matching-link')

                        this.navBarLinks.forEach(link => {
                            link.classList.remove('nav-bar--active')
                        })

                        document.querySelector(matchingHeaderLink).classList.add('nav-bar--active')
                    }
                },
                offset: '18%'
            })

            new Waypoint({
                element: pageSection,
                handler: (direction) => {
                    if (direction === 'up') {
                        let matchingHeaderLink = pageSection.getAttribute('data-matching-link')

                        this.navBarLinks.forEach(link => {
                            link.classList.remove('nav-bar--active')
                        })

                        document.querySelector(matchingHeaderLink).classList.add('nav-bar--active')
                    }
                },
                offset: '-40%'
            })
        })
    }
}

export { NavBar as default }