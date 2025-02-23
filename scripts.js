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
            // 添加高亮效果
            item.classList.toggle('selected');
            // 取消其他项的选择（单选）
            moduleItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('selected');
                }
            });
        });
    });

    // 3. 保存路线逻辑
    document.getElementById('save-route').addEventListener('click', function() {
        const selectedDest = document.getElementById('destination-select').value;
        const transport = document.querySelector('#transportation .module-item.selected')?.dataset.item || '';
        const accommodation = document.querySelector('#accommodation .module-item.selected')?.dataset.item || '';

        if (!selectedDest || selectedDest === '') {
            alert('请先选择一个目的地！');
            return;
        }
        const routeDetails = `目的地: ${selectedDest}\n交通工具: ${transport}\n住宿: ${accommodation}`;
        alert('旅游路线已保存！\n' + routeDetails);
        // 未来可以扩展到保存到区块链
    });

    // 4. 高德地图功能
    var map = new AMap.Map('map-container', {
        zoom: 4,               // 初始缩放级别，显示全球范围
        center: [116.397428, 39.90923], // 初始中心点（北京）
        viewMode: '3D',        // 使用3D视图
        resizeEnable: true     // 允许自动适应容器大小变化
    });

    // 添加地图工具条
    AMap.plugin(['AMap.ToolBar'], function() {
        map.addControl(new AMap.ToolBar());
    });

    // 定义全球热门旅游目的地坐标（按字母顺序）
    const destinations = {
        'Beijing': [116.4074, 39.9042],    // 北京
        'CapeTown': [18.4241, -33.9249],   // 开普敦
        'Changsha': [112.9823, 28.1941],   // 长沙
        'Chengdu': [104.0679, 30.6799],    // 成都
        'Chongqing': [106.5505, 29.5629],  // 重庆
        'Dubai': [55.2708, 25.2048],       // 迪拜
        'Fuzhou': [119.3061, 26.0753],     // 福州
        'Guangzhou': [113.2644, 23.1291],  // 广州
        'Hangzhou': [120.1551, 30.2741],   // 杭州
        'Jinan': [117.1588, 36.6682],      // 济南
        'Kunming': [102.7183, 25.0389],    // 昆明
        'London': [-0.1276, 51.5074],      // 伦敦
        'Nanjing': [118.7969, 32.0603],    // 南京
        'NewYork': [-74.0060, 40.7128],    // 纽约
        'Paris': [2.3522, 48.8566],        // 巴黎
        'Rio': [-43.1729, -22.9068],       // 里约热内卢
        'Shanghai': [121.4737, 31.2304],   // 上海
        'Shenzhen': [114.0579, 22.5431],   // 深圳
        'Sydney': [151.2093, -33.8688],    // 悉尼
        'Tianjin': [117.2009, 39.0842],    // 天津
        'Tokyo': [139.6917, 35.6895],      // 东京
        'Wuhan': [114.2986, 30.5844],      // 武汉
        'Xi’an': [108.9480, 34.2632]       // 西安
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

    // 监听下拉菜单变化
    document.getElementById('destination-select').addEventListener('change', function() {
        var selectedDest = this.value;
        if (selectedDest && destinations[selectedDest]) {
            map.setCenter(destinations[selectedDest]); // 设置地图中心
            addMarker(destinations[selectedDest], selectedDest); // 添加标记
        } else {
            // 清除标记（如果选择“请选择目的地”）
            map.clearMap();
        }
    });
});
