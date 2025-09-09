import { handleUIEvents } from '/src/js/ui-controller.js';
//import { handleSearchEvents } from './search.js';
//import { initSwiper } from './swiper.js'; // 예시

document.addEventListener('DOMContentLoaded', function() {
    // 모든 페이지에 필요한 공통 함수 실행
    handleUIEvents();
    
    // 서브 페이지별로 다른 로직을 처리하는 함수 호출
    if (document.querySelector('.search-page')) {
        initSearchPage();
    }
});