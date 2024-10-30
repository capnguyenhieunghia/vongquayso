(() => {
    const $ = document.querySelector.bind(document);

    let timeRotate = 7000;
    let currentRotate = 0;
    let isRotating = false;
    const wheel = $('.wheel');
    const btnWheel = $('.btn--wheel');
    const showMsg = $('.msg');

    // Thêm âm thanh quay
    const spinSound = new Audio('amthanhquay.mp3'); // Đảm bảo đường dẫn chính xác

    //=====< Danh sách phần thưởng >=====
    const listGift = [
        { text: 'Gấu bông ITC', chance: 0 },
        { text: 'Quạt ITC', chance: 5 },
        { text: 'Quay lại lần nữa', chance: 3 },
        { text: 'Bình nước ITC', chance: 5 },
        { text: 'Balo ITC', chance: 1 },
        { text: 'Chúc bạn may mắn lần sau', chance: 45 },
        { text: 'Bút ITC', chance: 11 },
        { text: 'Quay lại lần nữa', chance: 34 }
    ];

    const totalChance = 100;
    let cumulativeChance = 0;
    const cumulativeGifts = listGift.map(gift => {
        cumulativeChance += gift.chance;
        return {
            ...gift,
            cumulativeChance: cumulativeChance
        };
    });

    const size = listGift.length;
    const rotate = 360 / size;
    const skewY = 90 - rotate;

    cumulativeGifts.forEach((item, index) => {
        const elm = document.createElement('li');
        elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

        elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text ${index % 2 === 0 ? 'text-1' : 'text-2'}">
<b>${item.text}</b>
</p>`;

        wheel.appendChild(elm);
    });

    const start = () => {
        showMsg.innerHTML = '';
        isRotating = true;
        spinSound.play(); // Phát âm thanh khi bắt đầu quay
        const gift = getGift();
        currentRotate += 360 * 10; // Tăng vòng quay
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    };

    const rotateWheel = (currentRotate, index) => {
        $('.wheel').style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    };

    const getGift = () => {
        const random = Math.random() * totalChance; // Lấy giá trị ngẫu nhiên từ 0 đến 100
        for (let i = 0; i < cumulativeGifts.length; i++) {
            if (random < cumulativeGifts[i].cumulativeChance) {
                return { ...cumulativeGifts[i], index: i };
            }
        }

        return { ...cumulativeGifts[0], index: 0 };
    };

    const showGift = gift => {
        let timer = setTimeout(() => {
            isRotating = false;
            showMsg.innerHTML = ` "${gift.text}"`;
            clearTimeout(timer);
        }, timeRotate);
    };

    btnWheel.addEventListener('click', () => {
        !isRotating && start();
    });
})();