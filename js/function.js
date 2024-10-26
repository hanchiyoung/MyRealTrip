const $body = document.querySelector('body');
const $a = document.querySelectorAll('a');

// header - Select ----------------------------------------------------------------------------------------

const $gnb = document.querySelector('header .gnb');
const $pageup = document.querySelector('header .pageup');
const $control = document.querySelectorAll('header > .control > ul li');
const $serchInput = document.querySelector('header .top > .search > input');

//----------------------------------------------------------------------------------------------------------




// section - Prev, Next Select -----------------------------------------------------------------------------

const $section = document.querySelectorAll('section');

const $photo_four_prev = document.querySelector('section:nth-of-type(1) img.prev');
const $photo_four_next = document.querySelector('section:nth-of-type(1) img.next');
const $hotplace_prev = document.querySelector('section:nth-of-type(2) img.prev');
const $hotplace_next = document.querySelector('section:nth-of-type(2) img.next');
const $path_prev = document.querySelector('section:nth-of-type(4) img.prev');
const $path_next = document.querySelector('section:nth-of-type(4) img.next');


// section - one_slide move
const $round = document.querySelectorAll('section:nth-of-type(1) > .thema > .photo_one > .round > li');


// section - slide
const $photo_four_slide = document.querySelector('section > .thema > .photo_four');
const $photo_one_slide = document.querySelector('section:nth-of-type(1) > .thema > .photo_one > ul');
const $hotplace_slide = document.querySelector('section:nth-of-type(2) > .hotplace > .container');
const $path_slide = document.querySelector('section:nth-of-type(4) > .hotplace > .container');

//----------------------------------------------------------------------------------------------------------





// 변수 ----------------------------------------------------------------------------------------------------

let controlNowIdx = 0
let controlOldIdx = controlNowIdx;
let roundNowIdx = 0;
let roundOldIdx = roundNowIdx;
let intervalId;

const gnbTop = Math.floor($gnb.offsetTop);
const sectionTop = [];
const sectionHeight = [];

//----------------------------------------------------------------------------------------------------------




// section의 offsetTop값
$section.forEach((item, idx)=>{
    sectionTop[idx] = item.offsetTop-54;
    console.log(`sectionTop[idx] = ${sectionTop[idx]}`);
});

// section의 offsetHeight값
$section.forEach((item, idx)=>{
    sectionHeight[idx] = item.offsetHeight-10;
    console.log(`sectionHeight[idx] = ${sectionHeight[idx]}`);
});

// 모든 a태그에 대해 evt.preventDefault();
$a.forEach((item, idx)=>{
    item.addEventListener('click', (evt)=>{
        evt.preventDefault();
    });
});


//header --------------------------------------------------------------------------------------------------

window.addEventListener('scroll', ()=>{
    const scrollTop = Math.floor(window.scrollY);

    if(scrollTop < gnbTop + 20){
        $gnb.classList.remove('h-fixed');
    }
    else if(scrollTop > gnbTop + 20){
        $gnb.classList.add('h-fixed');
        // console.log(`현재 스크롤 위치: ${scrollTop}px`);
        // console.log(`gnbTop: ${gnbTop}px`);
    }


    for (let i = 0; i < sectionTop.length; i++) {
        if (sectionTop[i]+sectionHeight[i] > scrollTop) {
            controlOldIdx = controlNowIdx;
            controlNowIdx = i;
            $control[controlOldIdx].classList.remove('on');
            $control[controlNowIdx].classList.add('on');
            break;
        };
    };




});
$control.forEach((item, idx)=>{
    item.addEventListener('click', ()=>{
        controlOldIdx = controlNowIdx;
        controlNowIdx = idx;
        $control[controlOldIdx].classList.remove('on');
        $control[controlNowIdx].classList.add('on');
        $section[idx]
            window.scrollTo({
                left: 0,
                top: sectionTop[idx],
                behavior: 'smooth'
            });
    });
});

$pageup.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

$serchInput.addEventListener('focus', ()=>{
    $serchInput.value = '';
});
$serchInput.addEventListener('blur', ()=>{
    $serchInput.value = '도시나 상품을 검색해보세요';
});

//----------------------------------------------------------------------------------------------------------



//section - slide - top
$photo_four_prev.addEventListener('click', ()=>{
    $photo_four_slide.style.left = '0px';
    $photo_four_prev.classList.remove('on');
    $photo_four_next.classList.add('on');
});

$photo_four_next.addEventListener('click', ()=>{
    $photo_four_slide.style.left = '-1200px';
    $photo_four_next.classList.remove('on');
    $photo_four_prev.classList.add('on');
});

// section - one_slide
$round.forEach((item, idx)=>{
    $round[idx].addEventListener('click', ()=>{
        roundOldIdx = roundNowIdx;
        roundNowIdx = idx;
        $photo_one_slide.style.left = -100 * idx + '%';
        $round[roundOldIdx].classList.remove('selected');
        $round[roundNowIdx].classList.add('selected');
        clearInterval(intervalId);
        intervalId = setInterval(()=>{
            if(roundNowIdx < $round.length-1){
                roundOldIdx = roundNowIdx;
                roundNowIdx++;
            }
            else{
                roundOldIdx = roundNowIdx;
                roundNowIdx=0;
            }
            $photo_one_slide.style.left = -100 * roundNowIdx + '%';
            $round[roundOldIdx].classList.remove('selected');
            $round[roundNowIdx].classList.add('selected');
        }, 5000);
    });
});

intervalId = setInterval(()=>{
    if(roundNowIdx < $round.length-1){
        roundOldIdx = roundNowIdx;
        roundNowIdx++;
    }
    else{
        roundOldIdx = roundNowIdx;
        roundNowIdx=0;
    }
    $photo_one_slide.style.left = -100 * roundNowIdx + '%';
    $round[roundOldIdx].classList.remove('selected');
    $round[roundNowIdx].classList.add('selected');
}, 5000);

$hotplace_prev.addEventListener('click', ()=>{
    $hotplace_slide.style.left = '0px';
    $hotplace_prev.classList.remove('on');
    $hotplace_next.classList.add('on');
});

$hotplace_next.addEventListener('click', ()=>{
    $hotplace_slide.style.left = '-1200px';
    $hotplace_next.classList.remove('on');
    $hotplace_prev.classList.add('on');
});

$path_prev.addEventListener('click', ()=>{
    $path_slide.style.left = '0px';
    $path_prev.classList.remove('on');
    $path_next.classList.add('on');
});

$path_next.addEventListener('click', ()=>{
    $path_slide.style.left = '-1200px';
    $path_next.classList.remove('on');
    $path_prev.classList.add('on');
});
//section - slide - down