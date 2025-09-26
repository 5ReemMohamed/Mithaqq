document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    loadProducts();
    loadOrders();
    loadMarketers();
    loadCourses();
    loadStudents();
    loadInstructors();
}

function showDashboardSelection() {
    document.getElementById('dashboardSelection').classList.remove('d-none');
    document.getElementById('ecommerceDashboard').classList.add('d-none');
    document.getElementById('lmsDashboard').classList.add('d-none');
}

function showEcommerceDashboard() {
    document.getElementById('dashboardSelection').classList.add('d-none');
    document.getElementById('ecommerceDashboard').classList.remove('d-none');
    document.getElementById('lmsDashboard').classList.add('d-none');
    
    setTimeout(() => {
        initializeSalesChart();
        initializeProductsChart();
    }, 100);
}

function showLMSDashboard() {
    document.getElementById('dashboardSelection').classList.add('d-none');
    document.getElementById('ecommerceDashboard').classList.add('d-none');
    document.getElementById('lmsDashboard').classList.remove('d-none');
    
    setTimeout(() => {
        initializeEnrollmentsChart();
        initializeCompletionChart();
    }, 100);
}

// Sample data
const sampleProducts = [
    { id: 1, name: 'Digital Marketing Package', category: 'Service Package', price: 299, stock: 'Unlimited', status: 'Active' },
    { id: 2, name: 'Python Course', category: 'Training Course', price: 399, stock: 'Unlimited', status: 'Active' },
    { id: 3, name: 'Website Development', category: 'Tech Solution', price: 1299, stock: 'Custom', status: 'Active' },
    { id: 4, name: 'Travel Package Dubai', category: 'Travel Service', price: 799, stock: '25', status: 'Active' }
];

const sampleOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2025-01-15', total: 299, status: 'Completed' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2025-01-14', total: 399, status: 'Processing' },
    { id: 'ORD-003', customer: 'Mike Johnson', date: '2025-01-13', total: 1299, status: 'Pending' },
    { id: 'ORD-004', customer: 'Sarah Wilson', date: '2025-01-12', total: 799, status: 'Completed' }
];

const sampleMarketers = [
    { id: 1, name: 'Alex Brown', email: 'alex@example.com', sales: 15, commission: 450, status: 'Active' },
    { id: 2, name: 'Lisa Davis', email: 'lisa@example.com', sales: 23, commission: 690, status: 'Active' },
    { id: 3, name: 'Tom Wilson', email: 'tom@example.com', sales: 8, commission: 240, status: 'Inactive' }
];

const sampleCourses = [
    { id: 1, name: 'Digital Marketing Mastery', instructor: 'Sarah Johnson', students: 156, price: 299, status: 'Published' },
    { id: 2, name: 'Python Programming', instructor: 'David Rodriguez', students: 234, price: 399, status: 'Published' },
    { id: 3, name: 'Project Management', instructor: 'Michael Chen', students: 89, price: 499, status: 'Draft' }
];

const sampleStudents = [
    { id: 1, name: 'Emma Thompson', email: 'emma@example.com', courses: 3, progress: '75%', joinDate: '2024-12-01' },
    { id: 2, name: 'James Wilson', email: 'james@example.com', courses: 2, progress: '60%', joinDate: '2024-11-15' },
    { id: 3, name: 'Olivia Brown', email: 'olivia@example.com', courses: 4, progress: '90%', joinDate: '2024-10-20' }
];

const sampleInstructors = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', courses: 5, students: 456, rating: 4.8 },
    { id: 2, name: 'David Rodriguez', email: 'david@example.com', courses: 3, students: 234, rating: 4.7 },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', courses: 4, students: 189, rating: 4.9 }
];

function loadProducts() {
    const tbody = document.getElementById('productsTable');
    tbody.innerHTML = sampleProducts.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td><span class="badge badge-custome">${product.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 mb-2 mb-lg-0" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadOrders() {
    const tbody = document.getElementById('ordersTable');
    tbody.innerHTML = sampleOrders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>$${order.total}</td>
            <td><span class="badge badge-custome">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadMarketers() {
    const tbody = document.getElementById('marketersTable');
    tbody.innerHTML = sampleMarketers.map(marketer => `
        <tr>
            <td>${marketer.name}</td>
            <td>${marketer.email}</td>
            <td>${marketer.sales}</td>
            <td>$${marketer.commission}</td>
            <td><span class="badge badge-custome">${marketer.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 mb-2 mb-lg-0" onclick="viewMarketer(${marketer.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning" onclick="toggleMarketerStatus(${marketer.id})">
                    <i class="fas fa-toggle-on"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadCourses() {
    const tbody = document.getElementById('coursesTable');
    tbody.innerHTML = sampleCourses.map(course => `
        <tr>
            <td>${course.name}</td>
            <td>${course.instructor}</td>
            <td>${course.students}</td>
            <td>$${course.price}</td>
            <td><span class="badge badge-custome">${course.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1 mb-2 mb-lg-0" onclick="editCourse(${course.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteCourse(${course.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadStudents() {
    const tbody = document.getElementById('studentsTable');
    tbody.innerHTML = sampleStudents.map(student => `
        <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.courses}</td>
          
            <td>${student.joinDate}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewStudent(${student.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadInstructors() {
    const tbody = document.getElementById('instructorsTable');
    tbody.innerHTML = sampleInstructors.map(instructor => `
        <tr>
            <td>${instructor.name}</td>
            <td>${instructor.email}</td>
            <td>${instructor.courses}</td>
            <td>${instructor.students}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewInstructor(${instructor.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Chart initialization functions
function initializeSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#16A085',
                backgroundColor: 'rgba(22, 160, 133, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeProductsChart() {
    const ctx = document.getElementById('productsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Service Packages', 'Training Courses', 'Tech Solutions', 'Travel Services'],
            datasets: [{
                data: [35, 30, 20, 15],
                backgroundColor: ['#16A085', '#3498DB', '#F39C12', '#E74C3C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeEnrollmentsChart() {
    const ctx = document.getElementById('enrollmentsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Enrollments',
                data: [45, 67, 89, 123, 156, 189],
                backgroundColor: '#27AE60'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initializeCompletionChart() {
    const ctx = document.getElementById('completionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#27AE60', '#F39C12', '#E74C3C']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}



