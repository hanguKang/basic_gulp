export function handleUIEvents (e){

  //  ------------------------------ 모달 관리 ------------------------------
  // 모달의 z-index를 관리할 변수
    let modalZIndex = 1000;
  
    
    // 모달을 여는 함수
    function openModal(modalId) {
      // 모든 드롭다운 닫기 (모달이 열리면 다른 UI는 닫는 것이 일반적)
      closeAllDropdowns();
      
      const modal = document.getElementById(modalId);
      if (modal) {
        modalZIndex += 10;
        modal.style.zIndex = modalZIndex;
        modal.classList.add('is-open');
      }
    }
    
    // 모달을 닫는 함수
    function closeModal(modalElement) {
      if (modalElement) {
        modalElement.classList.remove('is-open');
        modalZIndex -= 10;
      }
    }
    
    // 4. 모달 외부 클릭 시 닫기
    const highestZIndexModal = [...document.querySelectorAll('.modal-wrap.is-open')]
      .sort((a, b) => parseInt(b.style.zIndex || 0) - parseInt(a.style.zIndex || 0))[0];
    
    if (e.target.classList.contains('modal-wrap') && e.target === highestZIndexModal) {
      closeModal(e.target);
      return;
    }

    
    //  ------------------------------ 드롭다운 관리 ------------------------------
    // 모든 열린 드롭다운을 닫는 함수
    function closeAllDropdowns() {
      const openDropdowns = document.querySelectorAll('.dropdown-wrap.is-open');
      openDropdowns.forEach(dropdown => {
        dropdown.classList.remove('is-open');
      });
    }
    // 드롭다운을 토글하는 함수
    function toggleDropdown(toggleElement) {
      const dropdownWrap = toggleElement.closest('.dropdown-wrap');
      if (dropdownWrap) {
        // 현재 드롭다운의 상태 확인
        const isOpen = dropdownWrap.classList.contains('is-open');
        
        // 모든 드롭다운을 먼저 닫기
        closeAllDropdowns();
        
        // 현재 드롭다운이 닫혀있었다면 열기
        if (!isOpen) {
          dropdownWrap.classList.add('is-open');
        }
      }
    }
    
    // 문서 전체 클릭 이벤트 감지 (모든 UI 컴포넌트 제어)
    //document.addEventListener('click', function(e) { ----> common.js에서 document.addEventListener('click' 또는 'change' 이벤 등을 한번에 관리
      // 1. 모달 열기 버튼 클릭 감지
      const modalOpenBtn = e.target.closest('[data-modal-open]');
      if (modalOpenBtn) {
        const modalId = modalOpenBtn.dataset.modalOpen;
        openModal(modalId);
        return;
      }
  
      // 2. 드롭다운 토글 버튼 클릭 감지
      const dropdownToggleBtn = e.target.closest('[data-dropdown-toggle]');
      if (dropdownToggleBtn) {
        toggleDropdown(dropdownToggleBtn);
        return;
      }
  
      // 3. 모달 닫기 버튼 클릭 감지
      const modalCloseBtn = e.target.closest('[data-modal-close]');
      if (modalCloseBtn) {
        const modal = modalCloseBtn.closest('.modal-wrap');
        closeModal(modal);
        return;
      }
  
  
      // 5. 드롭다운 외부 클릭 시 닫기
      if (!e.target.closest('.dropdown-wrap')) {
        closeAllDropdowns();
      }
    //});
}


