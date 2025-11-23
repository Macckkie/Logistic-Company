-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 23 ное 2025 в 16:31
-- Версия на сървъра: 10.4.32-MariaDB
-- Версия на PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `logistics_company`
--

-- --------------------------------------------------------

--
-- Структура на таблица `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `default_office_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone_alt` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `company_id`, `default_office_id`, `address`, `city`, `country`, `phone_alt`) VALUES
(1, 4, 1, 1, 'ул. Раковска 50', 'София', 'България', NULL),
(2, 5, 1, 2, 'ул. Марица 5', 'Пловдив', 'България', NULL);

-- --------------------------------------------------------

--
-- Структура на таблица `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `bulstat` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `companies`
--

INSERT INTO `companies` (`id`, `name`, `bulstat`, `address`, `city`, `country`, `phone`, `email`, `website`, `created_at`) VALUES
(1, 'ExpressLogistics', '123456789', 'бул. България 1', 'София', 'България', '+359 2 1234567', 'info@expresslogistics.bg', NULL, '2025-11-23 13:30:25');

-- --------------------------------------------------------

--
-- Структура на таблица `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `office_id` int(11) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `employee_type` enum('COURIER','OFFICE') NOT NULL,
  `hire_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `employees`
--

INSERT INTO `employees` (`id`, `user_id`, `company_id`, `office_id`, `position`, `employee_type`, `hire_date`, `is_active`) VALUES
(1, 2, 1, 1, 'Офис-служител', 'OFFICE', '2023-01-10', 1),
(2, 3, 1, 1, 'Куриер', 'COURIER', '2023-02-15', 1);

-- --------------------------------------------------------

--
-- Структура на таблица `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `action_type` varchar(50) NOT NULL,
  `action_description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура на таблица `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `offices`
--

INSERT INTO `offices` (`id`, `company_id`, `name`, `code`, `address`, `city`, `country`, `phone`, `is_active`) VALUES
(1, 1, 'Офис Център', 'SOF-CENTER', 'ул. Витоша 10', 'София', 'България', '+359 2 9000001', 1),
(2, 1, 'Офис Пловдив', 'PDV-CENTER', 'ул. Главна 20', 'Пловдив', 'България', '+359 32 9000002', 1);

-- --------------------------------------------------------

--
-- Структура на таблица `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'ADMIN', 'System administrator'),
(2, 'EMPLOYEE', 'Company employee'),
(3, 'CLIENT', 'Client of the company');

-- --------------------------------------------------------

--
-- Структура на таблица `shipments`
--

CREATE TABLE `shipments` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `tracking_number` varchar(50) NOT NULL,
  `sender_client_id` int(11) NOT NULL,
  `receiver_client_id` int(11) NOT NULL,
  `origin_office_id` int(11) DEFAULT NULL,
  `destination_office_id` int(11) DEFAULT NULL,
  `pickup_address` varchar(255) DEFAULT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  `weight_kg` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `delivery_type` enum('OFFICE','ADDRESS') NOT NULL,
  `status` enum('REGISTERED','IN_TRANSIT','DELIVERED','CANCELLED') NOT NULL DEFAULT 'REGISTERED',
  `registered_by_employee_id` int(11) NOT NULL,
  `delivered_by_employee_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `sent_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `shipments`
--

INSERT INTO `shipments` (`id`, `company_id`, `tracking_number`, `sender_client_id`, `receiver_client_id`, `origin_office_id`, `destination_office_id`, `pickup_address`, `delivery_address`, `weight_kg`, `price`, `delivery_type`, `status`, `registered_by_employee_id`, `delivered_by_employee_id`, `created_at`, `sent_at`, `delivered_at`) VALUES
(1, 1, 'TRK0001', 1, 2, 1, 2, NULL, 'Офис Пловдив', 2.50, 5.90, 'OFFICE', 'IN_TRANSIT', 1, NULL, '2025-11-23 13:30:25', '2025-11-23 13:30:25', NULL),
(2, 1, 'TRK0002', 2, 1, 2, NULL, NULL, 'ул. Раковска 50, София', 1.20, 7.50, 'ADDRESS', 'DELIVERED', 1, 2, '2025-11-20 13:30:25', '2025-11-21 13:30:25', '2025-11-22 13:30:25');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `email`, `full_name`, `phone`, `is_active`, `role_id`, `created_at`) VALUES
(1, 'admin', 'admin123', 'admin@logistics.bg', 'Admin Adminov', '+359888000001', 1, 1, '2025-11-23 13:30:25'),
(2, 'emp_office', 'office123', 'office@logistics.bg', 'Иван Офисов', '+359888000002', 1, 2, '2025-11-23 13:30:25'),
(3, 'emp_courier', 'courier123', 'courier@logistics.bg', 'Петър Куриров', '+359888000003', 1, 2, '2025-11-23 13:30:25'),
(4, 'client_1', 'client123', 'client1@mail.bg', 'Мария Клиентова', '+359888000004', 1, 3, '2025-11-23 13:30:25'),
(5, 'client_2', 'client456', 'client2@mail.bg', 'Георги Клиентов', '+359888000005', 1, 3, '2025-11-23 13:30:25');

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `default_office_id` (`default_office_id`);

--
-- Индекси за таблица `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Индекси за таблица `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `office_id` (`office_id`);

--
-- Индекси за таблица `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shipment_id` (`shipment_id`);

--
-- Индекси за таблица `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `company_id` (`company_id`);

--
-- Индекси за таблица `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индекси за таблица `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tracking_number` (`tracking_number`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `origin_office_id` (`origin_office_id`),
  ADD KEY `destination_office_id` (`destination_office_id`),
  ADD KEY `delivered_by_employee_id` (`delivered_by_employee_id`),
  ADD KEY `idx_shipments_status` (`status`),
  ADD KEY `idx_shipments_sender` (`sender_client_id`),
  ADD KEY `idx_shipments_receiver` (`receiver_client_id`),
  ADD KEY `idx_shipments_registered_by` (`registered_by_employee_id`),
  ADD KEY `idx_shipments_created_at` (`created_at`),
  ADD KEY `idx_shipments_delivered_at` (`delivered_at`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения за дъмпнати таблици
--

--
-- Ограничения за таблица `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `clients_ibfk_3` FOREIGN KEY (`default_office_id`) REFERENCES `offices` (`id`);

--
-- Ограничения за таблица `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`);

--
-- Ограничения за таблица `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`);

--
-- Ограничения за таблица `offices`
--
ALTER TABLE `offices`
  ADD CONSTRAINT `offices_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

--
-- Ограничения за таблица `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  ADD CONSTRAINT `shipments_ibfk_2` FOREIGN KEY (`sender_client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `shipments_ibfk_3` FOREIGN KEY (`receiver_client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `shipments_ibfk_4` FOREIGN KEY (`origin_office_id`) REFERENCES `offices` (`id`),
  ADD CONSTRAINT `shipments_ibfk_5` FOREIGN KEY (`destination_office_id`) REFERENCES `offices` (`id`),
  ADD CONSTRAINT `shipments_ibfk_6` FOREIGN KEY (`registered_by_employee_id`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `shipments_ibfk_7` FOREIGN KEY (`delivered_by_employee_id`) REFERENCES `employees` (`id`);

--
-- Ограничения за таблица `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
