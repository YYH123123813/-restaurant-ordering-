document.addEventListener("DOMContentLoaded", function() {
    // 通用工具函数
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // 1. 语言切换逻辑（适用于 index.html 和 create-route.html）
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

    if (languageOptions.length > 0) { // 仅在存在语言选项时初始化
        languageOptions.forEach(option => {
            option.addEventListener('click', function(event) {
                const selectedLanguage = event.target.getAttribute('data-lang');
                changeLanguage(selectedLanguage);
            });
        });
    }

    // 2. 旅游功能逻辑（适用于 index.html 和 create-route.html）
    // 模块选择逻辑
    const moduleItems = document.querySelectorAll('.module-item');
    if (moduleItems.length > 0) {
        moduleItems.forEach(item => {
            item.addEventListener('click', function(event) {
                console.log(`已选择: ${event.target.dataset.item}`);
                item.classList.toggle('selected');
                moduleItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('selected');
                    }
                });
            });
        });
    }

    // 保存路线逻辑
    const saveRouteBtn = document.getElementById('save-route');
    if (saveRouteBtn) {
        saveRouteBtn.addEventListener('click', function() {
            const selectedDest = document.getElementById('destination-select')?.value || '';
            const transport = document.querySelector('#transportation .module-item.selected')?.dataset.item || '';
            const accommodation = document.querySelector('#accommodation .module-item.selected')?.dataset.item || '';

            if (!selectedDest || selectedDest === '') {
                alert('请先选择一个目的地！');
                return;
            }
            const routeDetails = `目的地: ${selectedDest}\n交通工具: ${transport}\n住宿: ${accommodation}`;
            alert('旅游路线已保存！\n' + routeDetails);
        });
    }

    // 高德地图功能
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        var map = new AMap.Map('map-container', {
            zoom: 4,
            center: [116.397428, 39.90923],
            viewMode: '3D',
            resizeEnable: true
        });

        AMap.plugin(['AMap.ToolBar'], function() {
            map.addControl(new AMap.ToolBar());
        });

        const destinations = {
            'Beijing': [116.4074, 39.9042],
            'CapeTown': [18.4241, -33.9249],
            'Changsha': [112.9823, 28.1941],
            'Chengdu': [104.0679, 30.6799],
            'Chongqing': [106.5505, 29.5629],
            'Dubai': [55.2708, 25.2048],
            'Fuzhou': [119.3061, 26.0753],
            'Guangzhou': [113.2644, 23.1291],
            'Hangzhou': [120.1551, 30.2741],
            'Jinan': [117.1588, 36.6682],
            'Kunming': [102.7183, 25.0389],
            'London': [-0.1276, 51.5074],
            'Nanjing': [118.7969, 32.0603],
            'NewYork': [-74.0060, 40.7128],
            'Paris': [2.3522, 48.8566],
            'Rio': [-43.1729, -22.9068],
            'Shanghai': [121.4737, 31.2304],
            'Shenzhen': [114.0579, 22.5431],
            'Sydney': [151.2093, -33.8688],
            'Tianjin': [117.2009, 39.0842],
            'Tokyo': [139.6917, 35.6895],
            'Wuhan': [114.2986, 30.5844],
            'Xi’an': [108.9480, 34.2632]
        };

        function addMarker(position, title) {
            new AMap.Marker({
                position: position,
                title: title,
                map: map
            });
            map.setFitView();
        }

        const destinationSelect = document.getElementById('destination-select');
        if (destinationSelect) {
            destinationSelect.addEventListener('change', function() {
                var selectedDest = this.value;
                if (selectedDest && destinations[selectedDest]) {
                    map.setCenter(destinations[selectedDest]);
                    addMarker(destinations[selectedDest], selectedDest);
                } else {
                    map.clearMap();
                }
            });
        }
    }

    // 3. 登录系统逻辑（仅在 login.html 中执行）
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const mobileInput = document.getElementById('mobile');
        const passwordInput = document.getElementById('password');
        const mobileError = document.getElementById('mobileError');
        const passwordError = document.getElementById('passwordError');
        const getCodeBtn = document.getElementById('getCodeBtn');
        const submitBtn = document.getElementById('submitBtn');

        // 手机号实时验证
        mobileInput.addEventListener('input', function() {
            const value = this.value;
            if (!/^1[3-9]\d{9}$/.test(value)) {
                showError(mobileError, '手机号格式错误');
                this.classList.add('error');
                this.classList.remove('success');
            } else {
                clearError(mobileError);
                this.classList.remove('error');
                this.classList.add('success');
            }
        });

        // 密码实时验证
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            if (value.length < 6 || value.length > 16) {
                showError(passwordError, '密码长度需在6-16位之间');
                this.classList.add('error');
                this.classList.remove('success');
            } else {
                clearError(passwordError);
                this.classList.remove('error');
                this.classList.add('success');
            }
        });

        // 获取验证码（模拟）
        getCodeBtn.addEventListener('click', function() {
            if (mobileInput.classList.contains('error') || !mobileInput.value) {
                showError(mobileError, '请先输入正确手机号');
                return;
            }

            this.disabled = true;
            this.classList.add('loading');
            
            setTimeout(() => {
                this.disabled = false;
                this.classList.remove('loading');
                alert('验证码已发送至您的手机');
            }, 2000);
        });

        // 表单提交
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!mobileInput.classList.contains('success') || !passwordInput.classList.contains('success')) {
                alert('请先正确填写所有字段');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                alert('注册成功！');
                window.location.href = '/'; // 跳转回首页（index.html）
            }, 3000);
        });
    }
});
