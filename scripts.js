document.addEventListener("DOMContentLoaded", function() {
    // 1. 语言切换逻辑
    const languageOptions = document.querySelectorAll('.language-option');
    const textContent = {
        'zh': { title: '欢迎来到我的旅游平台！', home: '首页', login: '登录', support: '技术支持', feedback: '反馈', language: '语言选择' },
        'en': { title: 'Welcome to my website!', home: 'Home', login: 'Login', support: 'Support', feedback: 'Feedback', language: 'Language Select' },
        'jp': { title: '私のウェブサイトへようこそ！', home: 'ホーム', login: 'ログイン', support: '技術サポート', feedback: 'フィードバック', language: '言語選択' }
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

    // 4. 高德地图功能
    var map = new AMap.Map('map-container', {
        zoom: 10, // 初始缩放级别
        center: [116.397428, 39.90923], // 初始中心点（北京）
        viewMode: '3D', // 使用3D视图
        resizeEnable: true // 允许自动适应容器大小变化
    });

    // 添加地图工具条
    AMap.plugin(['AMap.ToolBar'], function() {
        map.addControl(new AMap.ToolBar());
    });

    // 城市坐标数据（使用高德坐标系）
    const destinations = {
        'Paris': [2.3522, 48.8566],
        'Tokyo': [139.6917, 35.6895],
        'NewYork': [-74.0060, 40.7128]
    };

    // 添加地图标记功能
    function addMarker(position, title) {
        new AMap.Marker({
            position: position,
            title: title,
            map: map
        });
        map.setFitView(); // 自动调整地图视野
    }

    // 目的地点击事件
    document.querySelectorAll('#destination .module-item').forEach(item => {
        item.addEventListener('click', () => {
            const dest = item.dataset.item;
            if (destinations[dest]) {
                map.setCenter(destinations[dest]);
                addMarker(destinations[dest], dest);
            }
        });
    });
});
