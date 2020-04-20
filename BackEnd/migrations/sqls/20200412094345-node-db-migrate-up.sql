-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th4 19, 2020 lúc 03:38 AM
-- Phiên bản máy phục vụ: 10.4.10-MariaDB
-- Phiên bản PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `database_ecommerce`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_brands`
--

DROP TABLE IF EXISTS `tbl_brands`;
CREATE TABLE IF NOT EXISTS `tbl_brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thương Hiệu';

--
-- Đang đổ dữ liệu cho bảng `tbl_brands`
--

INSERT INTO `tbl_brands` (`id`, `brandName`) VALUES
(1, 'ACER'),
(2, 'HP'),
(3, 'ASUS'),
(4, 'MacBook'),
(5, 'SAMSUNG'),
(6, 'VIVO'),
(7, 'IPHONE'),
(8, 'XIAOMI'),
(9, 'Vsmart');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_categories`
--

DROP TABLE IF EXISTS `tbl_categories`;
CREATE TABLE IF NOT EXISTS `tbl_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thể loại';

--
-- Đang đổ dữ liệu cho bảng `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `categoryName`) VALUES
(1, 'LAPTOP'),
(2, 'PHONE');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_customers`
--

DROP TABLE IF EXISTS `tbl_customers`;
CREATE TABLE IF NOT EXISTS `tbl_customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_customers`
--

INSERT INTO `tbl_customers` (`id`, `customerName`, `birthday`, `gender`, `address`, `phone`, `email`) VALUES
(1, 'Nguyễn Hồng Thái', '1996-03-24', 'Male', 'Hòa Bình, Chợ Mới, An Giang', '0379035252', 'nguyenhongthai2403@gmail.com'),
(2, 'Nguyen Van A', '1989-02-12', 'Male', 'Long Xuyên, An Giang', '0345045151', 'nguyenhongthai2403@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
CREATE TABLE IF NOT EXISTS `tbl_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notificationName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`,`orderId`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông báo ';

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_orderdetail`
--

DROP TABLE IF EXISTS `tbl_orderdetail`;
CREATE TABLE IF NOT EXISTS `tbl_orderdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promotion` float(20,3) NOT NULL,
  `price` float(20,3) NOT NULL,
  `promotionPrice` float(20,3) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` float(20,3) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`,`orderId`),
  KEY `orderId` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết đơn hàng';

--
-- Đang đổ dữ liệu cho bảng `tbl_orderdetail`
--

INSERT INTO `tbl_orderdetail` (`id`, `promotion`, `price`, `promotionPrice`, `quantity`, `amount`, `productId`, `orderId`) VALUES
(1, 50.000, 500.000, 450.000, 1, 450.000, 1, 1),
(2, 20.000, 250.000, 230.000, 1, 230.000, 11, 1),
(3, 50.000, 950.000, 900.000, 1, 900.000, 29, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_orders`
--

DROP TABLE IF EXISTS `tbl_orders`;
CREATE TABLE IF NOT EXISTS `tbl_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL,
  `total` float(20,3) NOT NULL,
  `customerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Đơn Hàng';

--
-- Đang đổ dữ liệu cho bảng `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `name`, `address`, `phone`, `email`, `status`, `discount`, `total`, `customerId`) VALUES
(1, 'Nguyễn Hồng Thái', 'Hòa Bình, Chợ Mới, An Giang', '0379035252', 'nguyenhongthai2403@gmail.com', 'New', 70, 680.000, 1),
(2, 'Nguyen Van A', 'Long Xuyên, An Giang', '0345045151', 'nguyenhongthai2403@gmail.com', 'New', 50, 900.000, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_paymentinfo`
--

DROP TABLE IF EXISTS `tbl_paymentinfo`;
CREATE TABLE IF NOT EXISTS `tbl_paymentinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `totalPayment` float(20,3) NOT NULL,
  `paymentDate` date NOT NULL,
  `chargeId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`,`customerId`),
  KEY `customerId` (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin thanh toán';

--
-- Đang đổ dữ liệu cho bảng `tbl_paymentinfo`
--

INSERT INTO `tbl_paymentinfo` (`id`, `totalPayment`, `paymentDate`, `chargeId`, `orderId`, `customerId`) VALUES
(1, 680.000, '1970-01-19', 'card_1GXhcNASTuB1N7z8OiSTerIg', 1, 1),
(2, 900.000, '1970-01-19', 'card_1GZTwKASTuB1N7z8wtaLCrVn', 2, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
CREATE TABLE IF NOT EXISTS `tbl_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` float(20,3) NOT NULL,
  `promotion` float(20,3) NOT NULL,
  `country` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brandId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `brandId` (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Sản phẩm';

--
-- Đang đổ dữ liệu cho bảng `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `productName`, `color`, `image`, `description`, `price`, `promotion`, `country`, `brandId`, `categoryId`) VALUES
(1, 'Samsung Galaxy A71', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587262541/blog/x8lqmprfhwxrwbm62o3h.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Super AMOLED, 6.7 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 10</li>\r\n	<li>Rear Camera: Main 64 MP &amp; Secondary 12 MP, 5 MP, 5 MP</li>\r\n	<li>Front camera: 32 MP</li>\r\n	<li>CPU: Snapdragon 730 8 cores</li>\r\n	<li>RAM: 8 GB</li>\r\n	<li>Internal memory: 128 GB</li>\r\n	<li>Memory card: MicroSD, support up to 512 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 4500 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 500.000, 50.000, 'KOREA', 5, 2),
(2, 'SAMSUNG GALAXY A51', 'blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587262432/blog/bpattdomumryf9gafxun.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Super AMOLED, 6.5 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 10</li>\r\n	<li>Rear Camera: Main 48 MP &amp; Secondary 12 MP, 5 MP, 5 MP</li>\r\n	<li>Front camera: 32 MP</li>\r\n	<li>CPU: Exynos 9611 8 cores</li>\r\n	<li>RAM: 6 GB</li>\r\n	<li>Internal memory: 128 GB</li>\r\n	<li>Memory card: MicroSD, support up to 512 GB</li>\r\n	<li>SIM: 2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 4000 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 400.000, 20.000, 'KOREA', 5, 2),
(3, 'iPhone 11 Pro Max 256GB', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263380/blog/exibubasxmimkkimwsvu.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: OLED, 6.5 &quot;, Super Retina XDR</li>\r\n	<li>Operating system: iOS 13</li>\r\n	<li>Rear camera: 3 cameras 12 MP</li>\r\n	<li>Front camera: 12 MP</li>\r\n	<li>CPU: Apple A13 Bionic 6 core</li>\r\n	<li>RAM: 4 GB</li>\r\n	<li>Internal memory: 256 GB</li>\r\n	<li>SIM Card: 1 eSIM &amp; 1 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 3969 mAh, with fast charging</li>\r\n</ul>\r\n', 1510.000, 50.000, 'USA', 7, 2),
(4, 'Phone Xs Max 256GB', 'Silver', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263257/blog/tjkyrdzri7z8gry6qowd.jpg', '<h2>Technical data</h2>\r\n\r\n<ul>\r\n	<li>\r\n	<h2>Screen: OLED, 6.5 &quot;, SUPER Rentina</h2>\r\n	</li>\r\n	<li>\r\n	<h2>Operating system: iOS 12</h2>\r\n	</li>\r\n	<li>\r\n	<h2>Rear Camera: Main 12 MP &amp; Secondary 12 MP</h2>\r\n	</li>\r\n	<li>\r\n	<h2>Front camera: 7 MP</h2>\r\n	</li>\r\n	<li>\r\n	<h2>CPU: Apple A12 Bionic 6 core</h2>\r\n	</li>\r\n	<li>\r\n	<h2>RAM: 4 GB</h2>\r\n	</li>\r\n	<li>\r\n	<h2>Internal memory: 256 GB</h2>\r\n	</li>\r\n	<li>\r\n	<h2>SIM Card: 1 eSim &amp; 1 Nani SIM, Support 4G</h2>\r\n	</li>\r\n	<li>\r\n	<h2>Battery capacity: 3174 mAh, with fast charging</h2>\r\n	</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 1300.000, 50.000, 'USA', 7, 2),
(5, 'Apple Macbook Pro Touch 2019 i5 1.4GHz/8GB/128GB', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263474/blog/mcu1hevdino7jdvamgr1.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i5 Coffee Lake 1.40 GHz</li>\r\n	<li>RAM: 8GB, DDR3L, 2133 MHz</li>\r\n	<li>Hard drive: SSD: 128 GB</li>\r\n	<li>Screen: 13.3 inch, Retina (2560 x 1600)</li>\r\n	<li>Graphics Card: Integrated graphics card, Intel Iris Plus Graphics 645</li>\r\n	<li>Ports: 2 x Thunderbolt 3 (USB-C)</li>\r\n	<li>Operating system: Mac OS</li>\r\n	<li>Design: Metal unibody, instant PIN</li>\r\n	<li>Size: 14.9 mm thick, 1.37 kg</li>\r\n	<li>Launched time: 2019</li>\r\n</ul>\r\n', 1500.000, 50.000, 'USA', 4, 1),
(6, 'Acer Swift 1 SF114 32 P2SG N5000/4GB/64GB/Win10', 'Turquoise', 'https://res.cloudinary.com/bluesky507/image/upload/v1586838288/blog/g9n4nasinenxlliog5it.jpg', '<h3><strong>Technical data</strong><br />\r\nCPU:<br />\r\nIntel Pentium, N5000, 1.10 GHz</h3>\r\n\r\n<p>RAM:<br />\r\n4 GB, DDR4 (1 slot), 2133 MHz</p>\r\n\r\n<p>Hard Drive:<br />\r\neMMC: 64GB, Supports M.2 PCIe SSD slot</p>\r\n\r\n<p>Screen:<br />\r\n14 inches, Full HD (1920 x 1080)</p>\r\n\r\n<p>Graphic card:<br />\r\nIntegrated graphics card, Intel&reg; UHD Graphics 605</p>\r\n\r\n<p>Connector:<br />\r\n2 x USB 3.0, HDMI, USB 2.0, USB Type-C</p>\r\n\r\n<p>Operating system:<br />\r\nWindows 10 Home SL</p>\r\n\r\n<p>Design:<br />\r\nMetal case, instant PIN</p>\r\n\r\n<p>Size:<br />\r\n14.95 mm thick, 1.3 kg</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 500.000, 20.000, 'CHINA', 1, 1),
(7, 'Xiaomi Redmi Note 9S', 'Green', 'https://res.cloudinary.com/bluesky507/image/upload/v1586838606/blog/qr1yfd2hwhlglv3xfuqy.jpg', '<p>Technical data<br />\r\nScreen: IPS LCD, 6.67 &quot;, Full HD +<br />\r\nOperating system: Android 10<br />\r\nRear Camera: Main 48 MP &amp; Secondary 8 MP, 5 MP, 2 MP<br />\r\nFront camera: 16 MP<br />\r\nCPU: Snapdragon 720G 8 cores<br />\r\nRAM: 6 GB<br />\r\nInternal memory: 128 GB<br />\r\nMemory card: MicroSD, support up to 256 GB<br />\r\nSIM:<br />\r\n2 Nano SIM, Support 4G<br />\r\nHOTSIM Vina Bum 120 (2GB / day)<br />\r\nBattery capacity: 5020 mAh, with fast charging</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 350.000, 50.000, 'CHINA', 8, 2),
(8, 'OPPO A91', 'White-blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1586838724/blog/z48ofxc41owvlivs2fhg.jpg', '<p>Technical data<br />\r\nScreen: AMOLED, 6.4 &quot;, Full HD +<br />\r\nOperating system: ColorOS 6.1 (Android 9.0)<br />\r\nRear Camera: Main 48 MP &amp; Secondary 8 MP, 2 MP, 2 MP<br />\r\nFront camera: 16 MP<br />\r\nCPU: MediaTek Helio P70 8 cores<br />\r\nRAM: 8 GB<br />\r\nInternal memory: 128 GB<br />\r\nMemory card: MicroSD, support up to 256 GB<br />\r\nSIM:<br />\r\n2 Nano SIM, Support 4G<br />\r\nHOTSIM Vina Bum 120 (2GB / day)<br />\r\nBattery capacity: 4025 mAh, with fast charging</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 400.000, 30.000, 'CHINA', 6, 2),
(9, 'Vivo V17 Pro', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263176/blog/ncgckbzkguswtntadmlu.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Super AMOLED, 6.44 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 48 MP &amp; Secondary 8 MP, 2 MP, 2 MP</li>\r\n	<li>Front Camera: Main 32 MP &amp; Secondary 8 MP</li>\r\n	<li>CPU: Snapdragon 675 8 core</li>\r\n	<li>RAM: 8 GB</li>\r\n	<li>Internal memory: 128 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>HOTSIM Vina Bum 120 (2GB / day)</li>\r\n	<li>Battery capacity: 4100 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 600.000, 50.000, 'CHINA', 6, 2),
(10, 'Vivo V15 128GB', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1586839005/blog/sn9fzgw9ance8z29rf7u.jpg', '<p>Technical data<br />\r\nScreen: IPS LCD, 6.53 &quot;, Full HD +<br />\r\nOperating system: Android 9.0 (Pie)<br />\r\nRear Camera: Main 12 MP &amp; Secondary 8 MP, 5 MP<br />\r\nFront camera: 32 MP<br />\r\nCPU: MediaTek Helio P70 8 cores<br />\r\nRAM: 6 GB<br />\r\nInternal memory: 128 GB<br />\r\nMemory card: MicroSD, support up to 256 GB<br />\r\nSIM:<br />\r\n2 Nano SIM, Support 4G<br />\r\nHOTSIM Vina Bum 120 (2GB / day)<br />\r\nBattery capacity: 4000 mAh, with fast charging</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 350.000, 300.000, 'CHINA', 6, 2),
(11, 'Vsmart Active 3 (6GB/64GB)', 'Violet', 'https://res.cloudinary.com/bluesky507/image/upload/v1586839162/blog/jszn819cxdwggpgk66hw.jpg', '<p>Technical data<br />\r\nScreen: AMOLED, 6.39 &quot;, Full HD +<br />\r\nOperating system: Android 9.0 (Pie)<br />\r\nRear Camera: Main 48 MP &amp; Secondary 8 MP, 2 MP<br />\r\nFront camera: 16 MP<br />\r\nCPU: MediaTek Helio P60 8 cores<br />\r\nRAM: 6 GB<br />\r\nInternal memory: 64 GB<br />\r\nMemory card: MicroSD, support up to 256 GB<br />\r\nSIM:<br />\r\n2 Nano SIM cards (dual SIM card slot), Support 4G<br />\r\nHOTSIM Vina Bum 120 (2GB / day)<br />\r\nBattery capacity: 4020 mAh, with fast charging</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 250.000, 20.000, 'Viet Nam', 9, 2),
(12, 'Vsmart Live (4GB/64GB)', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587262855/blog/vpyb3bs6ivytlbsmv0gx.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: AMOLED, 6.2 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 48 MP &amp; Secondary 8 MP, 5 MP</li>\r\n	<li>Front camera: 20 MP</li>\r\n	<li>CPU: Snapdragon 675 8 core</li>\r\n	<li>RAM: 4 GB</li>\r\n	<li>Internal memory: 64 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 4000 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 150.000, 25.000, 'Viet Nam', 9, 2),
(13, 'Vsmart Joy 3 (2GB/32GB)', 'Purple', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263021/blog/yjqz7v4iwbmnxvqdjzfq.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: IPS LCD, 6.5 &quot;, HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 13 MP &amp; Secondary 8 MP, 2 MP</li>\r\n	<li>Front camera: 8 MP</li>\r\n	<li>CPU: Snapdragon 632 8 core</li>\r\n	<li>RAM: 2 GB</li>\r\n	<li>Internal memory: 32 GB</li>\r\n	<li>Memory card: MicroSD, support up to 64 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 5000 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 120.000, 20.000, 'Viet Nam', 9, 2),
(14, 'Vsmart Bee', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263136/blog/vas4a0xkg1s7zgd0ydwu.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: IPS LCD, 5.45 &quot;, HD +</li>\r\n	<li>Operating system: Android 8.1 (Oreo)</li>\r\n	<li>Rear camera: 8 MP</li>\r\n	<li>Front camera: 5 MP</li>\r\n	<li>CPU: MediaTek MT6739 4 core</li>\r\n	<li>RAM: 1 GB</li>\r\n	<li>Internal memory: 16 GB</li>\r\n	<li>Memory card: MicroSD, support up to 64 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 2500 mAh</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 100.000, 10.000, 'Viet Nam', 9, 2),
(15, 'Vivo S1', 'Blue', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263782/blog/wel58nocktaobf9zwdnb.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Super AMOLED, 6.38 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 16 MP &amp; Secondary 8 MP, 2 MP</li>\r\n	<li>Front camera: 32 MP</li>\r\n	<li>CPU: MediaTek MT6768 8 cores (Helio P65)</li>\r\n	<li>RAM: 6 GB</li>\r\n	<li>Internal memory: 128 GB</li>\r\n	<li>Memory card: MicroSD, support up to 256 GB</li>\r\n	<li>SIM:</li>\r\n	<li>2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 4500 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 250.000, 20.000, 'CHINA', 6, 2),
(16, 'Vivo Y12', 'Red', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263761/blog/aqwrpntknlfee0czoxvy.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: IPS LCD, 6.35 &quot;, HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 13 MP &amp; Secondary 8 MP, 2 MP</li>\r\n	<li>Front camera: 8 MP</li>\r\n	<li>CPU: MediaTek MT6762 8 cores (Helio P22)</li>\r\n	<li>RAM: 3 GB</li>\r\n	<li>Internal memory: 64 GB</li>\r\n	<li>Memory card: MicroSD, support up to 256 GB</li>\r\n	<li>SIM Card: 2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 5000 mAh</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 170.000, 20.000, 'CHINA', 6, 2),
(17, 'Xiaomi Mi Note 10 Pro', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587263907/blog/tmwgnezln0efstjbulpm.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: AMOLED, 6.47 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 108 MP &amp; Secondary 20 MP, 12 MP, 5 MP, 2 MP</li>\r\n	<li>Front camera: 32 MP</li>\r\n	<li>CPU: S 256 GB</li>\r\n	<li>SIM card: napdragon 730G 8 cores</li>\r\n	<li>RAM: 8 GB</li>\r\n	<li>Internal memory: 2 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 5260 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 700.000, 70.000, 'CHINA', 8, 2),
(18, 'Xiaomi Mi A3', 'White', 'https://res.cloudinary.com/bluesky507/image/upload/v1587264035/blog/aln9xtfqbtprq6ijo7ks.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: AMOLED, 6.01 &quot;, HD +</li>\r\n	<li>Operating system: Android 9 Pie (Android One)</li>\r\n	<li>Rear Camera: Main 48 MP &amp; Secondary 8 MP, 2 MP</li>\r\n	<li>Front camera: 32 MP</li>\r\n	<li>CPU: Snapdragon 665 8 cores</li>\r\n	<li>RAM: 4 GB</li>\r\n	<li>Internal memory: 64 GB</li>\r\n	<li>Memory card: MicroSD, support up to 256 GB</li>\r\n	<li>SIM card: 2 Nano SIM cards (dual SIM card slot), 4G support</li>\r\n	<li>Battery capacity: 4030 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 200.000, 50.000, 'CHINA', 8, 2),
(19, 'Xiaomi Redmi Note 8 Pro (6GB/128GB)', 'White', 'https://res.cloudinary.com/bluesky507/image/upload/v1587264221/blog/yoribpl59mxcefjjacwe.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: IPS LCD, 6.53 &quot;, Full HD +</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 64 MP &amp; Secondary 8 MP, 2 MP, 2 MP</li>\r\n	<li>Front camera: 20 MP</li>\r\n	<li>CPU: Mediatek Helio G90T 8 cores</li>\r\n	<li>RAM: 6 GB</li>\r\n	<li>Internal memory: 128 GB</li>\r\n	<li>Memory card: MicroSD, support up to 256 GB</li>\r\n	<li>SIM card: 2 Nano SIM cards (dual SIM card slot), 4G support</li>\r\n	<li>Battery capacity: 4500 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 350.000, 20.000, 'CHINA', 8, 2),
(20, 'Samsung Galaxy Fold', 'Black', 'https://res.cloudinary.com/bluesky507/image/upload/v1587265401/blog/hrcpye84wshlhuwgdvhc.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Main: Dynamic AMOLED, Sub: Super AMOLED, Main 7.3 &quot;&amp; Extra 4.6&quot;, Quad HD (2K)</li>\r\n	<li>Operating system: Android 9.0 (Pie)</li>\r\n	<li>Rear Camera: Main 12 MP &amp; Secondary 12 MP, 16 MP</li>\r\n	<li>Front camera: Inside: 10 MP, 8 MP; External: 10 MP</li>\r\n	<li>CPU: Snapdragon 855 8 cores</li>\r\n	<li>RAM: 12 GB</li>\r\n	<li>Internal memory: 512 GB</li>\r\n	<li>SIM Card: 1 eSIM &amp; 1 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 4380 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 2500.000, 50.000, 'KOREA', 5, 2),
(21, 'Samsung Galaxy Z Flip', 'Black', 'https://res.cloudinary.com/bluesky507/image/upload/v1587265628/blog/kunscaswwog4rhpt15rv.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>Screen: Main: Dynamic AMOLED, secondary: Super AMOLED, 6.7 &quot;, Quad HD (2K)</li>\r\n	<li>Operating system: Android 10</li>\r\n	<li>Rear Camera: Main 12 MP &amp; Secondary 12 MP</li>\r\n	<li>Front camera: 10 MP</li>\r\n	<li>CPU: Snapdragon 855+ 8 core</li>\r\n	<li>RAM: 8 GB</li>\r\n	<li>Internal memory: 256 GB</li>\r\n	<li>SIM Card: 1 eSIM &amp; 1 Nano SIM, Support 4G</li>\r\n	<li>Battery capacity: 3300 mAh, with fast charging</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 1700.000, 100.000, 'KOREA', 5, 2),
(22, 'Acer Nitro AN515 54 71HS', 'Black', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266176/blog/qrzluexh8vfgvqa5ozkq.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i7 Coffee Lake, 9750H, 2.60 GHz</li>\r\n	<li>RAM: 8 GB, DDR4 (2 slots), 2400 MHz</li>\r\n	<li>Hard drive: SSD 256GB NVMe PCIe, Support M.2 SSD slot, Support SATA HDD slot</li>\r\n	<li>Screen: 15.6 inch, Full HD (1920 x 1080)</li>\r\n	<li>Graphics Card: Discrete graphics, NVIDIA GeForce GTX 1650 4GB</li>\r\n	<li>Ports: 2 x USB 3.1, HDMI, LAN (RJ45), USB 2.0, USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Plastic case, instant PIN</li>\r\n	<li>Size: 25.9 mm thick, 2.3 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 1300.000, 100.000, 'CHINA', 1, 1),
(23, 'Acer Swift 3 SF315 52 50T9', 'Gold', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266315/blog/kjlzb7upu1qcpqyxjfyu.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i5 Coffee Lake, 8250U, 1.60 GHz</li>\r\n	<li>RAM: 8 GB, DDR4 (On board +1 slot), 2133 MHz</li>\r\n	<li>Hard drive: SSD: 256 GB M.2 SATA3, Support SATA HDD slot</li>\r\n	<li>Screen: 15.6 inch, Full HD (1920 x 1080)</li>\r\n	<li>Video Card: Integrated graphics card, Intel&reg; UHD Graphics 620</li>\r\n	<li>Ports: 2 x USB 3.0, HDMI, USB 2.0, USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Metal case, instant PIN</li>\r\n	<li>Size: 16.9 mm thick, 1.7 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 900.000, 50.000, 'CHINA', 1, 1),
(24, 'Apple Macbook Pro Touch 2019', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266434/blog/nfagrl1ltibfgx8zzdyz.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i7 Coffee Lake, 2.60 GHz</li>\r\n	<li>RAM: 16GB, DDR4 (On board), 2400 MHz</li>\r\n	<li>Hard drive: SSD: 256 GB</li>\r\n	<li>Screen: 15.4 inch, Retina (2880 x 1800)</li>\r\n	<li>Graphics Card: Discrete graphics, AMD Radeon Pro 555X, 4 GB</li>\r\n	<li>Ports: 4 x Thunderbolt 3 (USB-C)</li>\r\n	<li>Operating system: Mac OS</li>\r\n	<li>Design: Metal monolithic case, instant PIN</li>\r\n	<li>Dimensions: Height 15.5 mm, 1.83 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 2600.000, 50.000, 'USA', 4, 1),
(25, 'Apple Macbook Air 2019', 'Pink', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266570/blog/sd1wsechyitga33o7ycl.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i5 Coffee Lake, 1.60 GHz</li>\r\n	<li>RAM: 8 GB, LPDDR3, 2133 MHz</li>\r\n	<li>Hard drive: SSD: 128 GB</li>\r\n	<li>Screen: 13.3 inch, Retina (2560 x 1600)</li>\r\n	<li>Graphics Card: Integrated graphics card, Intel UHD Graphics 617</li>\r\n	<li>Ports: 2 x Thunderbolt 3 (USB-C)</li>\r\n	<li>Operating system: Mac OS</li>\r\n	<li>Design: Metal monolithic case, instant PIN</li>\r\n	<li>Size: 4.1 to 15.6 mm thick, 1.25 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 1300.000, 100.000, 'USA', 4, 1),
(26, 'HP Pavilion 14 ce3014TU', 'Gold', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266879/blog/uglvdi0nxh8zfaci4ivk.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i3 Ice Lake, 1005G1, 1.20 GHz</li>\r\n	<li>RAM: 4 GB, DDR4 (1 slot), 2666 MHz</li>\r\n	<li>Hard drive: SSD 256GB NVMe PCIe, Support SATA HDD slot</li>\r\n	<li>Screen: 14 inches, Full HD (1920 x 1080)</li>\r\n	<li>Video Card: Integrated graphics card, Intel UHD Graphics</li>\r\n	<li>Ports: 2 x USB 3.1, HDMI, LAN (RJ45), USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Plastic cover - metal back cover, instant PIN</li>\r\n	<li>Size: 17.9 mm thick, 1.6 kg</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 700.000, 50.000, 'USA', 2, 1),
(27, 'HP Pavilion x360 dh0103TU', 'Gold', 'https://res.cloudinary.com/bluesky507/image/upload/v1587266860/blog/psp48p30snvacovspdsw.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i3 Coffee Lake, 8145U, 2.10 GHz</li>\r\n	<li>RAM: 4 GB, DDR4 (2 slots), 2666 MHz</li>\r\n	<li>Hard drive: HDD: 1 TB SATA3, Support M.2 SATA3 SSD slot</li>\r\n	<li>Screen: 14 inches, Full HD (1920 x 1080)</li>\r\n	<li>Video Card: Integrated graphics card, Intel&reg; UHD Graphics 620</li>\r\n	<li>Ports: 2 x USB 3.1, HDMI, USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Plastic case, instant PIN</li>\r\n	<li>Dimensions: 19.7 mm thick, 1.65 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 650.000, 30.000, 'USA', 2, 1),
(28, 'Asus VivoBook A412FA', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587267021/blog/vfxmbianca5p459dww8e.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i3 Coffee Lake, 8145U, 2.10 GHz</li>\r\n	<li>RAM: 4 GB, DDR4 (On board +1 slot), 2400 MHz</li>\r\n	<li>Hard drive: Intel Optane 32GB (H10), SSD 512GB M.2 PCIe, Support SATA HDD slot</li>\r\n	<li>Screen: 14 inches, Full HD (1920 x 1080)</li>\r\n	<li>Video Card: Integrated graphics card, Intel&reg; UHD Graphics 620</li>\r\n	<li>Ports: USB 3.1, HDMI, USB 2.0, USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Plastic cover - metal back cover, instant PIN</li>\r\n	<li>Dimensions: 19 mm thick, 1.5 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 800.000, 50.000, 'TAIWAN', 3, 1),
(29, 'Asus VivoBook A412F', 'Gray', 'https://res.cloudinary.com/bluesky507/image/upload/v1587267150/blog/qnna654xxlcdhh5rvuu6.jpg', '<p>Technical data</p>\r\n\r\n<ul>\r\n	<li>CPU: Intel Core i5 Comet Lake, 10210U, 1.60 GHz</li>\r\n	<li>RAM: 8 GB, DDR4 (On board 4GB +1 4GB slot), 2666 MHz</li>\r\n	<li>Hard drive: Intel Optane 32GB (H10), SSD 512GB M.2 PCIe, Support SATA HDD slot</li>\r\n	<li>Screen: 14 inches, Full HD (1920 x 1080)</li>\r\n	<li>Video Card: Integrated graphics card, Intel UHD Graphics</li>\r\n	<li>Ports: USB 3.1, HDMI, USB 2.0, USB Type-C</li>\r\n	<li>Operating system: Windows 10 Home SL</li>\r\n	<li>Design: Plastic case, instant PIN</li>\r\n	<li>Dimensions: 19.5 mm thick, 1,406 kg</li>\r\n</ul>\r\n\r\n<div id=\"eJOY__extension_root\" style=\"all: unset;\">&nbsp;</div>\r\n', 950.000, 50.000, 'TAIWAN', 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Admin - nhân viên';

--
-- Đang đổ dữ liệu cho bảng `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `userName`, `phone`, `account`, `password`, `permission`, `email`) VALUES
(1, 'Nguyễn Hồng Thái', '0379035252', 'admin', '25c1537528097a1a16f0c87d68d47cc9545a9342', 'MANAGE', 'nguyenhongthai@gmail.com');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `tbl_notification`
--
ALTER TABLE `tbl_notification`
  ADD CONSTRAINT `tbl_notification_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `tbl_notification_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `tbl_orders` (`id`);

--
-- Các ràng buộc cho bảng `tbl_orderdetail`
--
ALTER TABLE `tbl_orderdetail`
  ADD CONSTRAINT `tbl_orderdetail_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `tbl_products` (`id`),
  ADD CONSTRAINT `tbl_orderdetail_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `tbl_orders` (`id`);

--
-- Các ràng buộc cho bảng `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD CONSTRAINT `tbl_orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `tbl_customers` (`id`);

--
-- Các ràng buộc cho bảng `tbl_paymentinfo`
--
ALTER TABLE `tbl_paymentinfo`
  ADD CONSTRAINT `tbl_paymentinfo_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `tbl_orders` (`id`),
  ADD CONSTRAINT `tbl_paymentinfo_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `tbl_customers` (`id`);

--
-- Các ràng buộc cho bảng `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `tbl_brands` (`id`),
  ADD CONSTRAINT `tbl_products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `tbl_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
