// Head 컴포넌트 로더
document.addEventListener('DOMContentLoaded', function() {
    loadHead();
});

function loadHead() {
    fetch('components/head.html')
        .then(response => response.text())
        .then(data => {
            // head 태그에 내용 삽입
            const head = document.head;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            
            // 각 요소를 head에 추가
            while (tempDiv.firstChild) {
                head.appendChild(tempDiv.firstChild);
            }
        })
        .catch(error => {
            console.error('Head 컴포넌트 로드 실패:', error);
        });
} 