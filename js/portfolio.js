$(document).ready(function(){ 

    // 몇 개 있을지 모르는 sec의 각각의 offset().top 값 저장
    let arr_o_top = [];
    let arr_o_bot = [];
    let sec_length = $('.sec').length;
    
    for(let i = 0; i < sec_length; i++) {
        let tmp_o_top = $('.sec').eq(i).offset().top;
        arr_o_top.push(tmp_o_top);
    
        arr_o_bot.push(tmp_o_top + $('.sec').eq(i).outerHeight());
    }
    
    let arr_f_top = [];
    let fade_length = $('.fade').length
    for(let i = 0; i < fade_length; i++) {
        let tmp_f_top = $('.fade').eq(i).offset().top;
        arr_f_top.push(tmp_f_top);
    
    }
    
    
    let grap_length = $('.grap').length
    let chk = false;
    $(window).scroll(function(){
        let s_top = $(window).scrollTop();
        
        // 스크롤 움직일 때마다 위치 체크해서 indi 들 하나만 사이즈 바꾸기
        for(let i = 0; i < sec_length; i++) {
            if(arr_o_top[i] <= s_top  && s_top < arr_o_bot[i] - 50) {
                $('.indi').removeClass('indi_active');
                $('.indi').eq(i).addClass('indi_active');
                break;
            }
        }
    
        // sec 나타나게 하기
            for(let i=0; i<= fade_length; i++){
                if(s_top + 300 >= arr_f_top[i]){
                    $(`.fade`).eq(i).css({
                        opacity: '1'
                    })
                }
            }
    
        
    
    
        // 스크롤 내릴 때 그래프 움직이게 하기
        for(let i=0; i<grap_length; i++) {
            if (s_top >= $('.sec').eq(2).offset().top) {
            $('.grap_inner').eq(i).addClass('animate-width-'+ (i+1));
            if(chk != true) {
            for(let i=0; i<grap_length; i++) {
            tmp(i, array[i]);
            }   
            chk = true;
        }
        }
        }
    
    
    });
    
    // 퍼센트 함수
    let intValue = parseInt($('.grap_inner').text(), 10);
    let array = [];
    for(let i=0; i < grap_length; i++) {
        array.push(parseInt($('.grap_inner').eq(i).text(), 10));
    }
    
    function tmp(i, value) {
            let up = 0; 
            let interval;
            interval = setInterval(function () {
                up++;
    
                $('.grap').eq(i).find('.grap_inner').text(up + "%");
                if (up >= value ) {
                    clearInterval(interval);
                }
            }, 13)
        }
    
    
    // 인디케이터 클릭하면 스크롤 부드럽게 이동
    $(document).on('click', '.indi', function(event){
        event.preventDefault();
    
        let href = $(this).attr('href');
        let o_top = $(href).offset().top;
    
        $('html, body').animate({
            scrollTop: o_top
        }, 1000, function() {
            // 스크롤 애니메이션이 끝난 후 active 클래스 적용
            let index = $(href).index('.sec');
            $('.indi').removeClass('indi_active');
            $('.indi').eq(index).addClass('indi_active');
        });
    });
    
    // 메인 애니메이션(텍스트)
    var txtElements = document.querySelectorAll('.txt');
    
        txtElements.forEach(function (element) {
            var text = element.textContent;
            var newText = '';
    
            for (var i = 0; i < text.length; i++) {
                newText += '<span class="letter">' + text[i] + '</span>';
            }
    
            element.innerHTML = newText;
        });
    
        var letters = document.querySelectorAll('.letter');
        letters.forEach(function (letter, index) {
        letter.style.animation = 'changeFont 5s infinite ' + (index * 0.1) + 's';
        });
    
    // 메인 애니메이션(반짝)
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Star {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.flickerInterval = Math.floor(Math.random() * 50) + 50;
            this.flickerCounter = 0;
        }
    
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    
        update() {
            this.flickerCounter++;
    
            if (this.flickerCounter === this.flickerInterval) {
                this.radius = getRandom(0.5, 2);
                this.color = `rgba(255, 255, 255, ${getRandom(0.3, 1)})`;
                this.flickerCounter = 0;
                this.flickerInterval = Math.floor(Math.random() * 50) + 50;
            }
    
            this.draw();
        }
    }
    
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
    
        function spawnStars() {
            const x = getRandom(0, canvas.width);
            const y = getRandom(0, canvas.height);
            const radius = getRandom(0.5, 2);
            const color = `rgba(255, 255, 255, ${getRandom(0.3, 1)})`;
            return new Star(x, y, radius, color);
        }
    
        let stars;
        function init() {
            stars = [];
    
            for (let i = 0; i < 200; i++) {
                stars.push(spawnStars());
            }
        }
    
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            stars.forEach(star => {
                star.update();
            });
        }
    
        init();
        animate();
    
    });