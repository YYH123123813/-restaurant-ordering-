JavaScript的

自动换行

复制
document.addEventListener("DOMContentLoaded", function() {
    // 1. 语言切换逻辑
    const languageOptions = document.querySelectorAll('.language-option');

    const textContent = {
        'zh': {
            title: '欢迎来到我的旅游平台！',
            home: '首页',
            login: '登录',
            support: '技术支持',
            feedback: '反馈',
            language: '语言选择'
        },
        'en': {
            title: 'Welcome to my website!',
            home: 'Home',
            login: 'Login',
            support: 'Support',
            feedback: 'Feedback',
            language: 'Language Select'
        },
        'jp': {
            title: '私のウェブサイトへようこそ！',
            home: 'ホーム',
            login: 'ログイン',
            support: '技術サポート',
            feedback: 'フィードバック',
            language: '言語選択'
        }
    };

    function changeLanguage(language) {
        const content = textContent[language];

        document.querySelector('h1').innerText = content.title;
        document.querySelector('a[href="#home"]').innerText = content.home;
        document.querySelector('a[href="#login"]').innerText = content.login;
        document.querySelector('a[href="#support"]').innerText = content.support;
        document.querySelector('a[href="#feedback"]').innerText = content.feedback;
        document.querySelector('.dropbtn').innerText = content.language;
    }

    languageOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            const selectedLanguage = event.target.getAttribute('data-lang');
            changeLanguage(selectedLanguage);
        });
    });

    // 鼠标悬浮时显示下拉菜单
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseover', function() {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
        dropdownContent.style.display = 'none';
    });

    // 2. 模块选择逻辑
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
        item.addEventListener('click', function(event) {
            console.log(`已选择: ${event.target.dataset.item}`);
        });
    });

    // 3. 保存路线逻辑
    document.getElementById('save-route').addEventListener('click', function() {
        alert('旅游路线已保存！');
    });

    // 4. 整合高德地图功能
    var map = new AMap.Map('map-container', {
        zoom: 10,
        center: [2.3522, 48.8566]
    });

    var destinations = {
        'Paris': [2.3522, 48.8566],
        'Tokyo': [139.6917, 35.6895],
        'NewYork': [-74.0060, 40.7128]
    };

    document.querySelectorAll('#destination .module-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var dest = item.getAttribute('data-item');
            if (destinations[dest]) {
                map.setCenter(destinations[dest]);
                new AMap.Marker({
                    position: destinations[dest],
                    map: map
                });
            }
        });
    });
});
