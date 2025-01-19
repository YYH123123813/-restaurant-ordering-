// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    dropdown.addEventListener('click', function() {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });
});
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
