const eventHandler = () => {

    const cursorElement = document.querySelector('.cursor')
    window.addEventListener('mousemove', (e) => {
        e.preventDefault()

        // 鼠标移动时添加虚拟光标
        cursorElement.style.left = e.clientX + 'px'
        cursorElement.style.top = e.clientY + 'px'
        cursorElement.style.transform = 'translate(-50%, -50%)'
    }, false)

    window.addEventListener('mousedown', (e) => {
        cursorElement.style.transform = 'translate(-50%, -50%) scale(1.5)'
        cursorElement.style.opacity = 0.6
    }, false)

    window.addEventListener('mouseup', (e) => {
        cursorElement.style.transform = 'translate(-50%, -50%)'
        cursorElement.style.opacity = 0.4
    }, false)


}

export default eventHandler