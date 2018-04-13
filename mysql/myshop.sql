-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 13 Kwi 2018, 16:53
-- Wersja serwera: 10.1.28-MariaDB
-- Wersja PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `myshop`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `firstname` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `lastname` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `username` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 NOT NULL,
  `email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `city` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `postalcode` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `adress` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `country` int(3) DEFAULT NULL,
  `role` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `accounts`
--

INSERT INTO `accounts` (`account_id`, `firstname`, `lastname`, `username`, `password`, `email`, `city`, `postalcode`, `adress`, `country`, `role`) VALUES
(29, 'Wiktor', '?ukasiewicz', 'biolosek', '$2y$10$0J./OeaZICZdYISspv1SUuJcxmjj5sULzbzgHwRn2PueCjlcov0Fi', 'biolysubzero@gmail.com', '?mielow', '27-444', 'Sandomierska 222', 6, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `brands`
--

INSERT INTO `brands` (`brand_id`, `name`, `active`) VALUES
(1, 'Test Brand 1', 1),
(2, 'Test Brand 2', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `shortcut` varchar(2) CHARACTER SET latin1 NOT NULL,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Zrzut danych tabeli `countries`
--

INSERT INTO `countries` (`country_id`, `shortcut`, `name`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CG', 'Congo'),
(50, 'CK', 'Cook Islands'),
(51, 'CR', 'Costa Rica'),
(52, 'HR', 'Croatia (Hrvatska)'),
(53, 'CU', 'Cuba'),
(54, 'CY', 'Cyprus'),
(55, 'CZ', 'Czech Republic'),
(56, 'DK', 'Denmark'),
(57, 'DJ', 'Djibouti'),
(58, 'DM', 'Dominica'),
(59, 'DO', 'Dominican Republic'),
(60, 'TP', 'East Timor'),
(61, 'EC', 'Ecuador'),
(62, 'EG', 'Egypt'),
(63, 'SV', 'El Salvador'),
(64, 'GQ', 'Equatorial Guinea'),
(65, 'ER', 'Eritrea'),
(66, 'EE', 'Estonia'),
(67, 'ET', 'Ethiopia'),
(68, 'FK', 'Falkland Islands (Malvinas)'),
(69, 'FO', 'Faroe Islands'),
(70, 'FJ', 'Fiji'),
(71, 'FI', 'Finland'),
(72, 'FR', 'France'),
(73, 'FX', 'France, Metropolitan'),
(74, 'GF', 'French Guiana'),
(75, 'PF', 'French Polynesia'),
(76, 'TF', 'French Southern Territories'),
(77, 'GA', 'Gabon'),
(78, 'GM', 'Gambia'),
(79, 'GE', 'Georgia'),
(80, 'DE', 'Germany'),
(81, 'GH', 'Ghana'),
(82, 'GI', 'Gibraltar'),
(83, 'GK', 'Guernsey'),
(84, 'GR', 'Greece'),
(85, 'GL', 'Greenland'),
(86, 'GD', 'Grenada'),
(87, 'GP', 'Guadeloupe'),
(88, 'GU', 'Guam'),
(89, 'GT', 'Guatemala'),
(90, 'GN', 'Guinea'),
(91, 'GW', 'Guinea-Bissau'),
(92, 'GY', 'Guyana'),
(93, 'HT', 'Haiti'),
(94, 'HM', 'Heard and Mc Donald Islands'),
(95, 'HN', 'Honduras'),
(96, 'HK', 'Hong Kong'),
(97, 'HU', 'Hungary'),
(98, 'IS', 'Iceland'),
(99, 'IN', 'India'),
(100, 'IM', 'Isle of Man'),
(101, 'ID', 'Indonesia'),
(102, 'IR', 'Iran (Islamic Republic of)'),
(103, 'IQ', 'Iraq'),
(104, 'IE', 'Ireland'),
(105, 'IL', 'Israel'),
(106, 'IT', 'Italy'),
(107, 'CI', 'Ivory Coast'),
(108, 'JE', 'Jersey'),
(109, 'JM', 'Jamaica'),
(110, 'JP', 'Japan'),
(111, 'JO', 'Jordan'),
(112, 'KZ', 'Kazakhstan'),
(113, 'KE', 'Kenya'),
(114, 'KI', 'Kiribati'),
(115, 'KP', 'Korea, Democratic People\'s Republic of'),
(116, 'KR', 'Korea, Republic of'),
(117, 'XK', 'Kosovo'),
(118, 'KW', 'Kuwait'),
(119, 'KG', 'Kyrgyzstan'),
(120, 'LA', 'Lao People\'s Democratic Republic'),
(121, 'LV', 'Latvia'),
(122, 'LB', 'Lebanon'),
(123, 'LS', 'Lesotho'),
(124, 'LR', 'Liberia'),
(125, 'LY', 'Libyan Arab Jamahiriya'),
(126, 'LI', 'Liechtenstein'),
(127, 'LT', 'Lithuania'),
(128, 'LU', 'Luxembourg'),
(129, 'MO', 'Macau'),
(130, 'MK', 'Macedonia'),
(131, 'MG', 'Madagascar'),
(132, 'MW', 'Malawi'),
(133, 'MY', 'Malaysia'),
(134, 'MV', 'Maldives'),
(135, 'ML', 'Mali'),
(136, 'MT', 'Malta'),
(137, 'MH', 'Marshall Islands'),
(138, 'MQ', 'Martinique'),
(139, 'MR', 'Mauritania'),
(140, 'MU', 'Mauritius'),
(141, 'TY', 'Mayotte'),
(142, 'MX', 'Mexico'),
(143, 'FM', 'Micronesia, Federated States of'),
(144, 'MD', 'Moldova, Republic of'),
(145, 'MC', 'Monaco'),
(146, 'MN', 'Mongolia'),
(147, 'ME', 'Montenegro'),
(148, 'MS', 'Montserrat'),
(149, 'MA', 'Morocco'),
(150, 'MZ', 'Mozambique'),
(151, 'MM', 'Myanmar'),
(152, 'NA', 'Namibia'),
(153, 'NR', 'Nauru'),
(154, 'NP', 'Nepal'),
(155, 'NL', 'Netherlands'),
(156, 'AN', 'Netherlands Antilles'),
(157, 'NC', 'New Caledonia'),
(158, 'NZ', 'New Zealand'),
(159, 'NI', 'Nicaragua'),
(160, 'NE', 'Niger'),
(161, 'NG', 'Nigeria'),
(162, 'NU', 'Niue'),
(163, 'NF', 'Norfolk Island'),
(164, 'MP', 'Northern Mariana Islands'),
(165, 'NO', 'Norway'),
(166, 'OM', 'Oman'),
(167, 'PK', 'Pakistan'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestine'),
(170, 'PA', 'Panama'),
(171, 'PG', 'Papua New Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Peru'),
(174, 'PH', 'Philippines'),
(175, 'PN', 'Pitcairn'),
(176, 'PL', 'Poland'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'RE', 'Reunion'),
(181, 'RO', 'Romania'),
(182, 'RU', 'Russian Federation'),
(183, 'RW', 'Rwanda'),
(184, 'KN', 'Saint Kitts and Nevis'),
(185, 'LC', 'Saint Lucia'),
(186, 'VC', 'Saint Vincent and the Grenadines'),
(187, 'WS', 'Samoa'),
(188, 'SM', 'San Marino'),
(189, 'ST', 'Sao Tome and Principe'),
(190, 'SA', 'Saudi Arabia'),
(191, 'SN', 'Senegal'),
(192, 'RS', 'Serbia'),
(193, 'SC', 'Seychelles'),
(194, 'SL', 'Sierra Leone'),
(195, 'SG', 'Singapore'),
(196, 'SK', 'Slovakia'),
(197, 'SI', 'Slovenia'),
(198, 'SB', 'Solomon Islands'),
(199, 'SO', 'Somalia'),
(200, 'ZA', 'South Africa'),
(201, 'GS', 'South Georgia South Sandwich Islands'),
(202, 'ES', 'Spain'),
(203, 'LK', 'Sri Lanka'),
(204, 'SH', 'St. Helena'),
(205, 'PM', 'St. Pierre and Miquelon'),
(206, 'SD', 'Sudan'),
(207, 'SR', 'Suriname'),
(208, 'SJ', 'Svalbard and Jan Mayen Islands'),
(209, 'SZ', 'Swaziland'),
(210, 'SE', 'Sweden'),
(211, 'CH', 'Switzerland'),
(212, 'SY', 'Syrian Arab Republic'),
(213, 'TW', 'Taiwan'),
(214, 'TJ', 'Tajikistan'),
(215, 'TZ', 'Tanzania, United Republic of'),
(216, 'TH', 'Thailand'),
(217, 'TG', 'Togo'),
(218, 'TK', 'Tokelau'),
(219, 'TO', 'Tonga'),
(220, 'TT', 'Trinidad and Tobago'),
(221, 'TN', 'Tunisia'),
(222, 'TR', 'Turkey'),
(223, 'TM', 'Turkmenistan'),
(224, 'TC', 'Turks and Caicos Islands'),
(225, 'TV', 'Tuvalu'),
(226, 'UG', 'Uganda'),
(227, 'UA', 'Ukraine'),
(228, 'AE', 'United Arab Emirates'),
(229, 'GB', 'United Kingdom'),
(230, 'US', 'United States'),
(231, 'UM', 'United States minor outlying islands'),
(232, 'UY', 'Uruguay'),
(233, 'UZ', 'Uzbekistan'),
(234, 'VU', 'Vanuatu'),
(235, 'VA', 'Vatican City State'),
(236, 'VE', 'Venezuela'),
(237, 'VN', 'Vietnam'),
(238, 'VG', 'Virgin Islands (British)'),
(239, 'VI', 'Virgin Islands (U.S.)'),
(240, 'WF', 'Wallis and Futuna Islands'),
(241, 'EH', 'Western Sahara'),
(242, 'YE', 'Yemen'),
(243, 'ZR', 'Zaire'),
(244, 'ZM', 'Zambia'),
(245, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `invoice_name` varchar(255) DEFAULT NULL,
  `invoice_company_name` varchar(255) DEFAULT NULL,
  `invoice_nip` int(60) DEFAULT NULL,
  `invoice_adress` varchar(255) NOT NULL,
  `invoice_postalcode` varchar(45) NOT NULL,
  `invoice_city` varchar(255) NOT NULL,
  `shipping_name` varchar(255) NOT NULL,
  `shipping_adress` varchar(255) NOT NULL,
  `shipping_postalcode` varchar(45) NOT NULL,
  `shipping_city` varchar(255) NOT NULL,
  `user_company` int(11) DEFAULT NULL,
  `user_shipping` int(11) DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `payment_status` varchar(45) DEFAULT NULL,
  `shipping_status` varchar(45) DEFAULT NULL,
  `date_placed` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`order_id`, `invoice_name`, `invoice_company_name`, `invoice_nip`, `invoice_adress`, `invoice_postalcode`, `invoice_city`, `shipping_name`, `shipping_adress`, `shipping_postalcode`, `shipping_city`, `user_company`, `user_shipping`, `account_id`, `total`, `payment_status`, `shipping_status`, `date_placed`) VALUES
(48, 'Wiktor ?ukasiewicz', 'Try Me Now OKE?', 2147483647, 'Sandomierska 222', '27-444', '?mielow', 'Jest tak Jak jest', 'Test', '678678', 'Tak', 9, 3, 29, '2900.00', 'pending', 'pending', '2018-04-13 12:06:07'),
(49, 'Wiktor ?ukasiewicz', 'Nowa Testowa', 6687678, 'Taki tam adresik', '2786', 'Tak', 'Jest tak Jak jest', 'Test', '678678', 'Tak', 7, 3, 29, '2900.00', 'pending', 'pending', '2018-04-13 12:06:15'),
(50, 'Wiktor ?ukasiewicz', 'Nowa Testowa', 6687678, 'Sandomierska 222', '27-444', '?mielow', 'Testowy', 'Tak Tak', '2222', 'Tak', 7, 2, 29, '2900.00', 'pending', 'pending', '2018-04-13 12:06:18');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders_products`
--

CREATE TABLE `orders_products` (
  `order_product_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(4) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `price_total` decimal(10,2) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `orders_products`
--

INSERT INTO `orders_products` (`order_product_id`, `product_id`, `quantity`, `price`, `price_total`, `order_id`) VALUES
(43, 4, 1, '60.00', '60.00', 48),
(44, 3, 1, '280.00', '280.00', 48),
(45, 2, 1, '2500.00', '2500.00', 48),
(46, 1, 1, '60.00', '60.00', 48),
(47, 4, 1, '60.00', '60.00', 49),
(48, 3, 1, '280.00', '280.00', 49),
(49, 2, 1, '2500.00', '2500.00', 49),
(50, 1, 1, '60.00', '60.00', 49),
(51, 4, 1, '60.00', '60.00', 50),
(52, 3, 1, '280.00', '280.00', 50),
(53, 2, 1, '2500.00', '2500.00', 50),
(54, 1, 1, '60.00', '60.00', 50);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `quantity` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `category` int(11) NOT NULL,
  `brand` int(11) NOT NULL,
  `main_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `description`, `quantity`, `active`, `category`, `brand`, `main_img`) VALUES
(1, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(2, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(3, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(4, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(5, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(6, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(7, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(8, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(9, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(10, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(11, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(12, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 1, 'http://via.placeholder.com/200x200'),
(13, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(14, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(15, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(16, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(17, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(18, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(19, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(20, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(21, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(22, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(23, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(24, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 1, 'http://via.placeholder.com/200x200'),
(25, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(26, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(27, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(28, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(29, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(30, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(31, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(32, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(33, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(34, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(35, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(36, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 1, 'http://via.placeholder.com/200x200'),
(37, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(38, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(39, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(40, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(41, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(42, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(43, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(44, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(45, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(46, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(47, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(48, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 1, 'http://via.placeholder.com/200x200'),
(49, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(50, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(51, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(52, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(53, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(54, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(55, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(56, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(57, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200'),
(58, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(59, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(60, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 1, 'http://via.placeholder.com/200x200'),
(61, 'Testowy Prodult 1', '60.00', 'Jaki? tam opis wklepuj', 20, 1, 1, 1, 'http://via.placeholder.com/200x200'),
(62, 'Testowy Produkt 2', '2500.00', 'Te? jaki? opisik testowy', 85, 1, 1, 2, 'http://via.placeholder.com/200x200'),
(63, 'Nowy Produkcik', '280.00', 'Testeleste h?eszcze meszcze tak tak', 200, 1, 2, 2, 'http://via.placeholder.com/200x200');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products_categories`
--

CREATE TABLE `products_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products_categories`
--

INSERT INTO `products_categories` (`category_id`, `name`, `active`) VALUES
(1, 'Ciuchy', 1),
(2, 'Inne Zbocze?sta', 1),
(3, 'Placki', 1),
(4, 'I ogólnie takie takie', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products_images`
--

CREATE TABLE `products_images` (
  `product_image_id` int(11) NOT NULL,
  `source` varchar(255) NOT NULL DEFAULT 'http://via.placeholder.com/300x300',
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `products_images`
--

INSERT INTO `products_images` (`product_image_id`, `source`, `product_id`) VALUES
(1, 'http://via.placeholder.com/500x300', 1),
(2, 'http://via.placeholder.com/500x300', 2),
(3, 'http://via.placeholder.com/500x300', 1),
(4, 'http://via.placeholder.com/500x300', 1),
(5, 'http://via.placeholder.com/500x300', 2),
(6, 'http://via.placeholder.com/500x300', 1),
(7, 'http://via.placeholder.com/500x300', 1),
(8, 'http://via.placeholder.com/500x300', 2),
(9, 'http://via.placeholder.com/500x300', 6),
(10, 'http://via.placeholder.com/500x300', 5),
(11, 'http://via.placeholder.com/500x300', 4),
(12, 'http://via.placeholder.com/500x300', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `shipping_adresses`
--

CREATE TABLE `shipping_adresses` (
  `shipping_adress_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `data` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `postalcode` varchar(20) NOT NULL,
  `city` varchar(255) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `shipping_adresses`
--

INSERT INTO `shipping_adresses` (`shipping_adress_id`, `name`, `data`, `adress`, `postalcode`, `city`, `account_id`) VALUES
(2, 'Testowy', 'Nowy Testowy', 'Tak Tak', '2222', 'Tak', 29),
(3, 'Jest tak Jak jest', 'Jak jest', 'Test', '678678', 'Tak', 29),
(4, 'Robie Kanapki Bo Lubie', 'Wiktorek', 'wfaofaoinf 222', '8888', 'Warszwka2', 29);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users_companies`
--

CREATE TABLE `users_companies` (
  `company_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nip` int(20) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `postalcode` varchar(10) NOT NULL,
  `city` varchar(45) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `users_companies`
--

INSERT INTO `users_companies` (`company_id`, `name`, `nip`, `adress`, `postalcode`, `city`, `account_id`) VALUES
(7, 'Nowa Testowa', 6687678, 'Taki tam adresik', '2786', 'Tak', 29),
(9, 'Try Me Now OKE?', 2147483647, 'Jaki? tam', '78798', 'Wawa2', 29);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `login` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `country` (`country`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`),
  ADD UNIQUE KEY `shortcut` (`shortcut`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_company` (`user_company`),
  ADD KEY `user_shipping` (`user_shipping`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category` (`category`),
  ADD KEY `brand` (`brand`);

--
-- Indexes for table `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `products_images`
--
ALTER TABLE `products_images`
  ADD PRIMARY KEY (`product_image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `shipping_adresses`
--
ALTER TABLE `shipping_adresses`
  ADD PRIMARY KEY (`shipping_adress_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `users_companies`
--
ALTER TABLE `users_companies`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `nip` (`nip`),
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT dla tabeli `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT dla tabeli `orders_products`
--
ALTER TABLE `orders_products`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT dla tabeli `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT dla tabeli `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `products_images`
--
ALTER TABLE `products_images`
  MODIFY `product_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT dla tabeli `shipping_adresses`
--
ALTER TABLE `shipping_adresses`
  MODIFY `shipping_adress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users_companies`
--
ALTER TABLE `users_companies`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`country`) REFERENCES `countries` (`country_id`);

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_company`) REFERENCES `users_companies` (`company_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_shipping`) REFERENCES `shipping_adresses` (`shipping_adress_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Ograniczenia dla tabeli `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Ograniczenia dla tabeli `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `products_categories` (`category_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand`) REFERENCES `brands` (`brand_id`);

--
-- Ograniczenia dla tabeli `products_images`
--
ALTER TABLE `products_images`
  ADD CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Ograniczenia dla tabeli `shipping_adresses`
--
ALTER TABLE `shipping_adresses`
  ADD CONSTRAINT `shipping_adresses_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Ograniczenia dla tabeli `users_companies`
--
ALTER TABLE `users_companies`
  ADD CONSTRAINT `users_companies_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
