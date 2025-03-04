// Cuộn mượt đến section với hiệu ứng mượt hơn
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
    });
    element.style.animation = 'bounce 0.5s ease-in-out';
    setTimeout(() => element.style.animation = '', 500);
}

// Tìm địa điểm hiến máu (sử dụng Google Maps API)
function initMap() {
    const quyNhonLocation = { lat: 13.7824, lng: 109.2193 }; // Tọa độ Khu đô thị mới An Phú Thịnh, Quy Nhơn
    const map = new google.maps.Map(document.getElementById('map'), {
        center: quyNhonLocation,
        zoom: 15
    });

    const marker = new google.maps.Marker({
        position: quyNhonLocation,
        map: map,
        title: 'FPT University Quy Nhơn Blood Donation Drive'
    });

    // Tìm địa điểm dựa trên input
    function findDrive() {
        const location = document.getElementById('location').value.trim();
        const result = document.getElementById('result');
        
        if (location) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: location + ', Quy Nhon, Binh Dinh, Vietnam' }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    map.setCenter(results[0].geometry.location);
                    marker.setPosition(results[0].geometry.location);
                    result.textContent = `Donation drive found near ${location}!`;
                    result.style.color = '#FF6B6B';
                    result.style.animation = 'fadeInBounce 0.8s ease-in-out';
                } else {
                    result.textContent = 'No donation drive found. Please check your location.';
                    result.style.color = '#D43F3F';
                    result.style.animation = 'fadeInBounce 0.8s ease-in-out';
                }
            });
        } else {
            result.textContent = "Please enter your campus or location.";
            result.style.color = '#D43F3F';
            result.style.animation = 'fadeInBounce 0.8s ease-in-out';
        }
    }

    document.querySelector('.drive-button').addEventListener('click', findDrive);
}

// Hiệu ứng khi cuộn (scroll reveal với animation phức tạp)
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.about, .find-drive, .donate, .eligibility, .stories, .contact');
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.animation = 'slideUp 1s ease-out';
        }
    });
});

// Gửi form liên hệ (AJAX với backend PHP)
function submitContact(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);

    formData.append('action', 'contact');

    fetch('server.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        form.style.transform = 'scale(0.95)';
        setTimeout(() => {
            alert(data.message);
            form.style.transform = 'scale(1)';
            form.reset();
        }, 200);
    })
    .catch(error => {
        alert('Error submitting form. Please try again.');
        form.style.transform = 'scale(1)';
    });
}

// Gửi form đăng ký hiến máu (AJAX với backend PHP)
function submitDonor(event) {
    event.preventDefault();
    const form = document.getElementById('donorForm');
    const formData = new FormData(form);

    formData.append('action', 'donate');

    fetch('server.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        form.style.transform = 'scale(0.95)';
        setTimeout(() => {
            alert(data.message);
            form.style.transform = 'scale(1)';
            form.reset();
        }, 200);
    })
    .catch(error => {
        alert('Error registering as a donor. Please try again.');
        form.style.transform = 'scale(1)';
    });
}

// Mở form giả lập (có thể thay bằng popup thực tế với hiệu ứng)
function openDonationForm() {
    const button = document.querySelector('.pulse');
    button.style.animation = 'pulseFast 0.5s infinite';
    const form = document.getElementById('donationForm');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
    setTimeout(() => {
        button.style.animation = 'pulse 2s infinite';
    }, 300);
}

// Animations mới
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    @keyframes fadeInBounce {
        0% { opacity: 0; transform: translateY(20px); }
        50% { opacity: 0.5; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseFast {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);