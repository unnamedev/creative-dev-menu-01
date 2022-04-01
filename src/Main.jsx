import {IoCloseSharp} from "react-icons/io5"
import {useEffect, useRef} from "react"
import {gsap} from "gsap"
import {Power2} from "gsap/gsap-core"

// A way to create a ref array.
const useArrayRef = () => {
    const refs = []
    return [refs, el => el && refs.push(el)]
}

/**
 * @description ⚠️ Main
 * @param logo
 * @param menu
 * @param info
 * @param toggle
 * @returns {JSX.Element}
 * @constructor
 */
const Main = ({data: {logo, menu, info, toggle}}) => {
    let navContent = useRef(null)
    let bgText = useRef(null)
    const [menuItems, ref] = useArrayRef()
    const t1 = gsap.timeline({paused: true})

    useEffect(() => {
        t1.to(navContent, {opacity: 1, duration: 1, top: 0, ease: Power2.easeInOut, visibility: "visible"})
        t1.to(menuItems, {
            opacity: 1,
            marginBottom: 0,
            duration: 1,
            ease: Power2.easeInOut,
            stagger: 0.3,
        }, ">-0.5")
        t1.to(bgText, {opacity: 1, duration: 1, marginTop: 0}, ">-0.5")
    }, [])

    const onOpen = () => {
        t1.play().timeScale(1)
    }

    const onClose = () => {
        t1.timeScale(2.5)
        t1.reverse()
    }


    return <div className="content">
        <nav className="navbar">

            <div className="navbar__top">
                <a className="navbar__logo" href={logo.href}>{logo.label}</a>
                <button className="navbar__toggle" onClick={onOpen}>{toggle}</button>
            </div>

            <div
                ref={el => {
                    navContent = el
                }}
                className="navbar__content"
            >
                <div className="bg-text" ref={el => {
                    bgText = el
                }}>Menu
                </div>
                <button className="navbar__close" onClick={onClose}>
                    <IoCloseSharp size={30} color="#fff" style={{pointerEvents: "none"}}/>
                </button>

                <div className="navbar__column">
                    <ul className="navbar__menu">
                        {menu.map((i, idx) =>
                            <li ref={ref} key={idx}><a data-number={`0${idx + 1}`} href={i.href}>{i.label}</a></li>
                        )}
                    </ul>
                </div>

                <div className="navbar__column">
                    <ul className="navbar-info">
                        {info.map((i, idx) =>
                            <li key={idx}>
                                <h3>{i.title}</h3>
                                <p>{i.text}</p>
                            </li>
                        )}
                    </ul>
                </div>

            </div>
        </nav>
    </div>
}

export default Main

// A default props. It is a way to set default values for props.
Main.defaultProps = {
    data: {
        logo: {
            label: "Uniqo",
            href: "#"
        },
        toggle: "Menu",
        menu: [
            {
                label: "Home",
                href: "#"
            },
            {
                label: "Blog",
                href: "#"
            },
            {
                label: "About",
                href: "#"
            }
        ],
        info: [
            {
                title: "Contact",
                text: "dev.nagoev@gmail.com"
            },
            {
                title: "Follow me",
                text: "Telegram"
            },
        ]
    }
}
