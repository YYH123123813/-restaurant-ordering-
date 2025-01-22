document.addEventListener("DOMContentLoaded", function() {
    // 获取所有的语言选择链接
    const languageOptions = document.querySelectorAll('.language-option');

    // 设置语言切换的文本
    const textContent = {
        'zh': {
            title: '欢迎来到我的网站！',
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

    // 设置语言变更函数
    function changeLanguage(language) {
        const content = textContent[language];

        // 更新标题
        document.querySelector('h1').innerText = content.title;

        // 更新导航栏
        document.querySelector('a[href="#home"]').innerText = content.home;
        document.querySelector('a[href="#login"]').innerText = content.login;
        document.querySelector('a[href="#support"]').innerText = content.support;
        document.querySelector('a[href="#feedback"]').innerText = content.feedback;
        document.querySelector('.dropbtn').innerText = content.language;
    }

    // 为每个语言选项添加点击事件监听器
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
});
document.addEventListener("DOMContentLoaded", function() {
    // 获取所有的语言选择链接
    const languageOptions = document.querySelectorAll('.language-option');

    // 设置语言切换的文本
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

    // 设置语言变更函数
    function changeLanguage(language) {
        const content = textContent[language];

        // 更新标题
        document.querySelector('h1').innerText = content.title;

        // 更新导航栏
        document.querySelector('a[href="#home"]').innerText = content.home;
        document.querySelector('a[href="#login"]').innerText = content.login;
        document.querySelector('a[href="#support"]').innerText = content.support;
        document.querySelector('a[href="#feedback"]').innerText = content.feedback;
        document.querySelector('.dropbtn').innerText = content.language;
    }

    // 为每个语言选项添加点击事件监听器
    languageOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            const selectedLanguage = event.target.getAttribute('data-lang');
            changeLanguage(selectedLanguage);
        });
    });

    // 模块化拼接功能：用户选择模块
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
        item.addEventListener('click', function(event) {
            console.log(`已选择: ${event.target.dataset.item}`);
            // 这里可以进一步处理用户选择的旅游模块，例如将其加入到最终的旅行路线中
        });
    });

    // 保存并展示旅游路线
    document.getElementById('save-route').addEventListener('click', function() {
        alert('旅游路线已保存！');
        // 此时可以将用户拼接的旅行路线通过区块链技术保存到链上
    });
});
