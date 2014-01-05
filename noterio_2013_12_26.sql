-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 27, 2013 at 03:03 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `noterio`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `bookid` int(11) NOT NULL AUTO_INCREMENT,
  `author` text,
  `pub` text,
  `date` text,
  `city` text,
  `title` text,
  `translator` text,
  `article` text,
  `vol` text,
  `issue` text,
  `misc` text,
  `type` text,
  `tags` text,
  `journal` text,
  `container` text,
  `url` text,
  `project` text,
  `user` text,
  `nickname` text,
  `pages` text,
  `note` text,
  `isbn` text,
  `parent` text,
  PRIMARY KEY (`bookid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`bookid`, `author`, `pub`, `date`, `city`, `title`, `translator`, `article`, `vol`, `issue`, `misc`, `type`, `tags`, `journal`, `container`, `url`, `project`, `user`, `nickname`, `pages`, `note`, `isbn`, `parent`) VALUES
(8, 'David, Paul A.; Thomas, Mark, eds.', 'Oxford University Press', '2003', '', 'Economic Future in Historical Perspective', '', NULL, '', '', '', '', NULL, '', '', '', 'future', 'dw', 'EFHP', NULL, NULL, NULL, NULL),
(10, 'Pollard, Sidney', 'Basic Books', '1968', '', 'The Idea of Progress: History and Society', '', NULL, '', '', '', '', NULL, '', '', '', 'future', 'dw', '', NULL, NULL, NULL, NULL),
(11, 'auhor,name', 'pub', 'jan. 1, 2001', '', 'title', '', NULL, 'volume', 'ish', 'miscagain', 'type', NULL, '', 'container', 'htt[://url.com', 'infohist', 'dw', 'nick', NULL, 'note', 'note', NULL),
(12, 'Knox, Bernard', 'W.W. Norton & Co.', '1994', '', 'Backing into the Future', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(13, 'Tuula MittilÃ¤ and Anne-Mari JÃ¤rvelin', 'Proceedings of the 17th IMP Conference', 'Sept., 2001', '', 'Expectation Management In Business Relations: Strategies', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(14, 'Cova, Bernard; Pace, Stefano; Salle, Robert', '', '', '', 'Expectation Management in Project Business: A Question of Renunciation', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(15, 'Clarke, Arthur C.', '', '', '', 'Explorations in Tomorrow', '', NULL, '', '', '', '', NULL, '', 'MATF', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(16, 'McHale, John', 'George Brazillier', '1969', '', 'The Future of the Future', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(17, 'Van Doren, Charles', 'Frederick A. Praeger', '1967', '', 'The Idea of Progress', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(18, 'Pavitt, K.L.R', '', '', '', 'Malthus and Other Economists', '', NULL, '', '', '', '', NULL, '', 'TATF', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(19, 'Freeman, Christopher', '', '', '', 'Malthus with a Computer', '', NULL, '', '', '', '', NULL, '', 'TATF', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(20, 'Gunn, James E., ed.', 'University Press of Kansas', '1968', '', 'Man and the Future', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', 'MATF', NULL, 'Talks and panel discussions', '', NULL),
(21, 'Breisach, Ernst', 'University of Chicago Press', '2003', '', 'On the Future of History: The Postmodernist Challenge and Its Aftermath', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(22, 'Churchill, R.C.', 'Werner Laurie', '1955', '', 'A Short History of the Future: Based on the most reliable authorities with maps, etc.', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(23, 'Wagar, W. Warren', 'University of Chicago Press', '1987', '', 'A Short History of the Future', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(24, 'Cole, H.S.D.; Curnow, R.C.', '', '', '', 'Evaluation of the World Models', '', NULL, '', '', '', '', NULL, '', 'TATF', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(25, 'Maleuvre, Didier', 'University of California Press', '2011', '', 'The Horizon: A History of Our Infinite Longing', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, '', '', NULL),
(26, 'Teggart, Frederick J.; REvised edition with introduction by George H. Hildebrand', 'University of California Press', '1949', '', 'The Idea of Progress: A Collection of Readings', '', NULL, '', '', '', '', NULL, '', '', '', 'Future2', 'dw', '', NULL, 'Revised edition', 'Revised edition', 'TATF'),
(27, 'Cole, H.S.D.', '', '', '', 'The Structure of the World Models', '', NULL, '', '', '', '', NULL, '', 'TATF', '', 'Future2', 'dw', '', NULL, 'Revised edition', 'Revised edition', 'TATF'),
(28, 'Cole, H.S.D.; Freeman, Christopher; Jahoda, Marie; Pavitt, K.L.R', 'Chatto & Windus', '1973', '', 'Thinking about the Future: A Critique of The Limits to Growth', '', NULL, '', '', '', 'anthology', NULL, '', '', '', 'Future2', 'dw', 'TATF', NULL, 'Revised edition', 'Revised edition', NULL),
(31, 'Fell, Joseph P.', '', '1986', '', 'The Crisis of Reasong: A Reading of Heidegger''s Zur Seinsfrage', '', NULL, '2', '', '', '', NULL, '', '', '', 'Fell', 'dw', '', NULL, '', '', NULL),
(32, 'Fell, Joseph P.', 'Columbia University Press', '1979', '', 'Heidegger and sartre: An Essay on Being and Place', '', NULL, '2', '', '', '', NULL, '', '', '', 'Fell', 'dw', '', NULL, '', '', NULL),
(33, 'Fell, Joseph', 'Research in Phenomenology', '', '', 'Heidegger''s Mortals and Gods', '', NULL, 'XV', '', '', '', NULL, '', '', '', 'Fell', 'dw', '', NULL, '', '', NULL),
(34, 'Fell, Joseph', 'The REview of Metaphysics', 'December, 1971', '', 'Heidegger''s Notion of Two Beginnings', '', NULL, '', '', '', '', NULL, '', '', '', 'Fell', 'dw', '', NULL, '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `noteid` int(11) NOT NULL AUTO_INCREMENT,
  `bookid` int(11) DEFAULT NULL,
  `content` text,
  `page` text,
  `tagstring` text,
  `rating` text,
  `indent` int(4) NOT NULL,
  `origorder` int(4) NOT NULL,
  PRIMARY KEY (`noteid`),
  FULLTEXT KEY `notes_index` (`content`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=189 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`noteid`, `bookid`, `content`, `page`, `tagstring`, `rating`, `indent`, `origorder`) VALUES
(14, 8, ' "The function of historical economics is too often viewed in much the same way as Descartes and his followers regarded history in general. They thought that it was invariant mathematical laws that held the struths about te nture of the world, and so took history''s usefulness to consist pirmairly in supplying illusrations of the workings of thos underlying aws."', '12-13', '', NULL, 0, 0),
(11, 8, ' NOTES', '', '', NULL, 0, 0),
(12, 8, ' Anthologizes papers presented to an International Symposium in 1999, on the topic of "The Economic Challenges of the Twenty-First Century in Historical Perspective" >', 'xv', ' econ', NULL, 0, 0),
(13, 8, ' "presentism": "presenting the past not on its own terms, but iwth an eye fixed on the conserns of the moment." >', '9', ' present', NULL, 0, 0),
(48, 10, ' "Manifestly, the idea of science we usually regard as Baconian is rooted in the requirments of the early capitalist economy and technology: its rudiements appear first in the treateises of fifteenth-century craftsmen." from Edgar Zilsel, "Geneis of the idea of scientific progress," journal of thisory of ideas, 6 (1945) p[. 346. CF his "Te Socilogical roots of science," American J of Sociology 47 (1943) >', '', 'readLater', NULL, 0, 0),
(45, 10, ' The battle of the ancients and the moderns: Could we surpass. Resolved around 1700 See Comte  >', '12', 'readLater', NULL, 0, 0),
(46, 10, ' By 1680s and 1690s, philosophers agreed we could surpass the ancients in science and tech. Belief in social prgress was slower.', '13', 'progress', NULL, 0, 0),
(47, 10, ' These ideas were rooted in the development of capitalism and of a new class of man.', '14-5', 'readLater', NULL, 0, 0),
(44, 10, 'Bishop Bossuet became the but t of Voltaire for not believeing in progress >', '', 'readLater', NULL, 0, 0),
(43, 10, ' Francis Bacon (along with Le Roy) thought we could go past the brilliance of the ancients.', '8', '', NULL, 0, 0),
(42, 10, ' Renaissance shattered old beliefs, ushering modern age. "the first expressins of the belief i pprogress emerged out of the creation of the new science itself..."', '6', '', NULL, 0, 0),
(41, 10, ' "[T]here was nthing in the heritage of antiquity to support the idea of human evolution and progress. Experience did not encourage the belief in an updward movement, wile mythology rather suggested a decline from the golden heroic age."', '5', '', NULL, 0, 0),
(38, 10, 'Greeks: cyclical history', '2', '', NULL, 0, 0),
(39, 10, ' Judeo-Christian history as a drama, narrative', '3', '', NULL, 0, 0),
(40, 10, ' S. Augustine and Christianity: preparing for the end. No evolution of human history, "only its apocalyptic end."', '3-4', '', NULL, 0, 0),
(37, 10, 'Ancients had no idea of history because they had no experience of change having a direction', '2', '', NULL, 0, 0),
(36, 10, 'ee Turgot, Condorcet >', '', 'readLater', NULL, 0, 0),
(35, 10, ' Also implies that this is true for all mankind, and a set of values outside of history itself against which progress can be measured.', 'vi', '', NULL, 0, 0),
(32, 10, 'NOTES', '', '', NULL, 0, 0),
(33, 10, 'Belief in progress "is always in the nature of a scientific prediction, based on the reading of history ... and the operation of laws of social development."', 'v', '', NULL, 0, 0),
(34, 10, ' Charles Van Doren: belief in progress "implies the assumption that a pattern of change exists in  the history of mankind, that this pattern is known, that it consists of irreversible changes in one general diection onl, and that this direction is towards improvement from ''a less desirable  to a more desirable state o affairs.''" (Van Doren, The Idea of Progress, 1967) >', 'v', 'van Doren', NULL, 0, 0),
(49, 11, ' NOTES', '', '', NULL, 0, 0),
(50, 11, 'note 1 >', '1', ' tag2', NULL, 0, 0),
(51, 11, '3note 2>', '', 'tag3', NULL, 0, 0),
(52, 12, ' Greek word opiso means "ilterally ''behind'' or ''back,'' refers not to the past but to the future. The early Greek imagination envisaged the past and the present as in front of us--we can see them. The future invisible, is behind us. Onlu a few very wise men can see what is behind them."', '11', '', NULL, 0, 0),
(53, 12, 'From the Christian Church on, we''ve looked forward to the future. Millennialism. Progress. "These modern futuramas have their irreconcilable differnces, but they have one thing in common: they all resolutely reject the past." ', '12', 'history', NULL, 0, 0),
(54, 13, ' "Expectations have been presented by Alderson and Martin (1965) as one of the three', '2', 'null', NULL, 0, 0),
(55, 13, 'imitive terms (or should we say concepts) that together are capable of describing', '', '', NULL, 0, 0),
(56, 13, 'ery kind of system relevant to marketing analysis, the other terms (or concepts) being', '', '', NULL, 0, 0),
(57, 13, 'ts and behaviour. "', '', '', NULL, 0, 0),
(58, 13, ' "According to Ojasalo (1999) the nature of expectations can be explicit, implicit, fuzzy,', '2', '', NULL, 0, 0),
(59, 13, 'alistic or unrealistic..."', '', '', NULL, 0, 0),
(60, 13, '"Expectations can also be official or unofficial."', '3', '', NULL, 0, 0),
(61, 13, ' Strategies include: intro-recative, extro-reactive, co-reactive, intro-proactive, co-proactive', '8-10', '', NULL, 0, 0),
(62, 14, 'keywords for this paper: Construction, Dreams, Ideal building, Project phases, Suffering.]', '', '', NULL, 0, 0),
(63, 14, ' specially interested in construction industry where expect mgt is a "major issue"', '2', '', NULL, 0, 0),
(64, 14, ' "Expectations cannot be considered as fixed marks. They evolve interacting with the service provided. Rust et al. (1999) show that expectations are constantly updated using a Bayesian framework) and they should be treated as a distribution, not as a constant value."', '3', '', NULL, 0, 0),
(65, 14, ' "The Construction Industry has a reputation for delivering defective buildings late and over cost and consequently not to meet customer expectations. The majority of customers - business customers or end customers - daunted by the reputation of the construction industry are often nervous about seeking new construction and this lack of confidence in the industry may have quite a serious impact upon the quality of the relationship between the customer and the construction company (Cox and Thompson, 1997). At the same time, unrealistic expectations are very frequent in project business. Indeed, the customer faced with a specific and complex problem can develop numerous possible and diverse solutions. Everything is open and the interaction with suppliers during the sale phase of a project adds more uncertainty to this diversity that generates highly unrealistic expectations."', '4', '', NULL, 0, 0),
(66, 15, 'Clarke''s three laws:1. "If a distinguished but elderl scientist sas tat something is possible e is almost certainly correct. If he was that something is impossible is very probably wrong." "By elderly scinetist I meant anyone over thirty." 2. "The only way one can find the limits of the possible are by goingbeyond them into the impossible." 3. "Any advanced technology is indistinguishable from magic."', '247-8', '', NULL, 0, 0),
(67, 16, '"Culurally...the idea of the future...is relatively new in human experience. Most  previous societies operated with quite different models... For some, the future was largely a continuation of the past." In the East, time was cyclical [p4] In the West, we think of the future as progress.', '3', '', NULL, 0, 0),
(68, 16, 'The West has believed the future is open since the industrial rev.', '6', '', NULL, 0, 0),
(69, 16, ' "Predicting the future is no longer the business of utopians orlunatics...Prediction...has now come to pervade many sectors of society. Governments and industries alike...foind that they are increasingly forced to think not only of the next ten or twenty years aheadm but of the next fifty -- or even the next hundred years." This is because our projects are so complex, e.g., "To send a anned space vehicle to the moon requires that work on the be project be started maany years before..." (written in 1969) ', '7', 'prediction', NULL, 0, 0),
(70, 16, 'Tech predictions are fairly easy, but social fiutres are not.', '8', '', NULL, 0, 0),
(71, 16, '"..man now has an enormously enhanced capacity to choose his future..." To do this, we need to "conceptualize" the future and act.', '9', '', NULL, 0, 0),
(72, 16, '"The future of the future is therefore what we degermined it to be...It is directly related to how we conceive of its possibilities potentials, and implications."', '10', '', NULL, 0, 0),
(73, 16, '"The range of predictions regarding the future is now relatively enormous."', '10', '', NULL, 0, 0),
(74, 16, 'Egypt, Persia, India and "the East" had a "long unchanging fixity of world view and a rigidty about the goals and purposes of societies, which did not include any doctrine of even gradual temporal progress..."', '25', 'progress, history', NULL, 0, 0),
(75, 16, 'Romaniticism glorified the past, revivified medievalism', '32-4', '', NULL, 0, 0),
(76, 16, ' Key to industrial age were "tools to make tools" i.e. machine tools.  First was  Wilkinson''s boring mill, in 1775, which made cylinders for Watt''s steam engine.', '', '', NULL, 0, 0),
(77, 16, '"...our present generation now faces the future with globally developed capacities that free man, for he first time, from many of the age-old fears of material scarcity...which have paralyzed his initiative and frustrated his ore innovative directions." ', '51', 'optimism', NULL, 0, 0),
(78, 16, '"A new and more sober assessment of the human condition has emerged, in which opimism regarding man''s aspirations and potentialitoes is tempered by he implications of his more negative prediclections. Te quality of huanity istf is no longer a God-gien constant, but a self-definition..."', '57', '', NULL, 0, 0),
(79, 17, 'The work was done collaboratively, says Mortimer Adler in the intro', 'xi', '', NULL, 0, 0),
(80, 17, ' All writers who believe in progress think it is irreversible and for the better (Adler in the intro)', 'xi', '', NULL, 0, 0),
(81, 17, ' "Progress, in short, is irreversible meliorative change."', '3', '', NULL, 0, 0),
(82, 17, '  Belief in progress involves four affirmations: (a) "A definite pattern of change exists in the history of mankind" b. "The pattern of change that is manifested in history is not only deisco verable but is also actually known." c. "The existent and known pattern of change in hitory is, in the long run, irreversible in direction." d. "The difetion of he irrevesible pattern of change in hisory is toward the better, i.e., is an improvement in the  state ogf man or an advance from a less to a more desirable state of affairs."', '4-6', '', NULL, 0, 0),
(83, 17, ' theories of hisory: progress, cyclical,regress, no pattern, no knowable pattern, can''t make value judgments about history', '8-12', '', NULL, 0, 0),
(84, 17, '11 theories of progress. Manifstation of cosmic procrss or totally human. Each divided in two, and each of the 4 is divided. Due to man''s collective memory, his reason?', '26', '', NULL, 0, 0),
(85, 17, 'Wiener on entropy', '155', '', NULL, 0, 0),
(86, 17, 'Progress in the fine arts? No, says turgot. We reached our height in the Augustan age.', '459', 'art', NULL, 0, 0),
(87, 17, ' within progress: a. necessary or contingent; b.  continues or plateaus out; c human nature progresses;', '14-15', '', NULL, 0, 0),
(88, 18, ' Problems with testing complex models: small systematic biases may be hard to detect but have large effects. The parameters are not independent.', '111', '', NULL, 0, 0),
(89, 19, 'The problem with Limits to Growth is the assumptions about the relationships.', '7', '', NULL, 0, 0),
(90, 19, 'This is not a purely technical problem. "It ids essential to look at the political bias and the values implicitly or explicitly present in any stud of social systems."', '7', '', NULL, 0, 0),
(91, 19, '"The model is the message."', '7', '', NULL, 0, 0),
(92, 19, 'Computer models should not replace mental models, a type of "computer fetishism." "The compuer fetishist endows the computer model with a validity and indepndent power which altogether transcends he mental models which are its essential basis."', '8', '', NULL, 0, 0),
(93, 19, ' "Computer models cannot replace theory."', '8', '', NULL, 0, 0),
(94, 19, ' E.g., it''s imporant to consider not just rates of growth, but composition and fruits of growth. Also, the MIT group "is underestimating the possibilities of continuous technical progress."', '10', '', NULL, 0, 0),
(95, 21, ' "In the late 1800s, Carl L. Becker and Henri Berr worried about the viability of history in light of what they saw as the more rapid modernization of the social sciences. They would be joied by Frereick Jackson Turner, James Harvey Robinson, and Karl KAmprecht in calling for and pioneeering a New History." They called for  preference be given to "deep, anonymous sdrucures and forces" over individuals and events (Turner''s words) ', '3', 'history, data, history', NULL, 0, 0),
(96, 21, ' pomos don''t want to define pomo because that "would draw tight orders aroud postmodernism and give preference to one meaning of the term over others," and "that would violate their very injnction against exclusions." ', '5', 'pomo, history', NULL, 0, 0),
(97, 21, ' Are we in posthistory, "a period...of infinite with an utterly new mdoe of human life"', '10', '', NULL, 0, 0),
(98, 21, 'pomos "chose the most uncompromising variant of progress as their antagonist: progress as the relentless and also merciless march of reason through time toward a totally new stage of human existence." a la condorcet . ', '12', 'progress, history', NULL, 0, 0),
(99, 22, ' Louis-SÃ©bastien Mercier wrote <em>L'' An 2440</em> in 1772. "Called by some the Father of Historical Futurity," he described Paris in 2440. Women don''t use cosmetics, they take care of the family, "Marriages were founded on ove, not money; and anyone could marry anyone else."', '14', '', NULL, 0, 0),
(100, 22, ' Mercier: Men don'' wear swords.', '15', '', NULL, 0, 0),
(101, 23, ' This book predicts the future -- written as a look backwards from 200 yrs ahead -- and talks about the "bibliotel network" that distributes digitized docuents. "By the year 2030, the bibliotel etwork werved more than twenty iollio institutioal and indivirual subscribers in all countries. It held electroic copeis of ine-tenths of all te books, periodicals and achival colletios in the world; Supplekentary fees were charged for cpojsultig works still under copyright. Most of the world''s great gresearch libraries and archives were covertd into museums, visited more by tourists than by scholars." [So small because The World biblioel sutek as "oeprated by WT&T". It all "could have been made available to any purhcasr at cost. Buyt WT&T jealously guarded its hoard..." and "was he only available resource" [88-9] ', '', 'internet', NULL, 0, 0),
(102, 24, 'Problems with testing complex models: small systematic biases may be hard to detect but have large effects. The parameters are not independent.', '111', '', NULL, 0, 0),
(103, 25, ' "This vanishing -- the trace of human vision seeing itself out -- is indeed what we mean by horizon."', '2', '', NULL, 0, 0),
(104, 25, '"_Horizon_ highlights the subjective, makeshift nature of perceiived reality."', '2', '', NULL, 0, 0),
(105, 25, '"No one can logically or practically travel through the horizon."', '4', '', NULL, 0, 0),
(106, 25, ' Egypt''s "cultic activities" all assumed "the desirability of permanence, cyclical stability, and the absence of progress. No other culture has quite matched the ancient Egyptians in so single-mindedly [12] mobilizing against change."  3,000 years', '11', 'progress, egypt', NULL, 0, 0),
(107, 25, '"This fixation on permanence seems to be the oldest prevailing feature of the Egyptian civilization."', '12', '', NULL, 0, 0),
(108, 25, '"The three-millennium long tradition of apothecary burial rites...suggests the prospect of a rather domestic, physical afterlife....And where death promised ever more of the same, the same smacked ever more of death."', '13', 'death, egypt', NULL, 0, 0),
(109, 25, ' "In ancient Egypt, the denial of finitude was not just an aspect of civilization but its driving force..." ', '14', 'death, egypt', NULL, 0, 0),
(110, 25, ' Egypt didn''t see our origins as coming from a moment long ago (although they had a misty idea) but "as a daily occurrent, hence cyclical and timeless, that coincided with the sunrise." "Accordfingly the gods were praised not for spawning the world, but for begettging and maintaining it daily."', '14', '', NULL, 0, 0),
(111, 25, ' The Babylonians and Greeks "accepted change and death as elements of the cosmic balnace."', '14-15', '', NULL, 0, 0),
(112, 25, ' "The Egyptian worldview...represented the world seen from no particular standpoint." They showed what they knew [18-19]: they knew humans have two legs so they always show them. Appearance was being for them. Ra creates the world anew every morning by blinking. [20:] there is only one right place to view an Egyptian statue, unlike Greek that invite you look at it from different angles.', '18', '', NULL, 0, 0),
(113, 25, 'Egyptian horizon is "not a gateway to the unseen, but a sentry cordon that brackets off any inkling of escape."', '21', '', NULL, 0, 0),
(114, 25, ' Exception: 17-yr rule of King Amenhotep IV. One god: Aten. Sunlight. Couldn''t be captured in images. [25] Art now shows pictures of real life, unidealized figures including the king.', '24', '', NULL, 0, 0),
(115, 25, 'The opening  of the Gilgamesh says it will tell us of the life and deeds of Gilgamesh. "To see and know all: alive already is the impulse to shape life into a finite hwhole..."', '30', '', NULL, 0, 0),
(116, 25, 'It''s going to tell us all. "The premise, and promise, of any story is that it conveys _all_ there is to say..." "We have fiction  so as to see  life as a fintie sum--to jump beyond the horizon and behold the whole thing, round like the Earth seen from outer space." ', '31', 'story, Mesopotamia', NULL, 0, 0),
(117, 25, 'Odysseus is a hero "hankering after the human lot."', '40', '', NULL, 0, 0),
(118, 25, 'Genesis leads us to entertain "a situation where the world is nothing but a possibility."', '53', '', NULL, 0, 0),
(119, 25, ' "The human condition is a gateway." "In essence, the Christina religion suggested that we are not what we are; that we are what we _will_ be -- gods in waiting. Our essence is potentiality, not actuality." ', '103', 'death, Christianity', NULL, 0, 0),
(120, 25, ' "The Renaissance...moved the infinite into the field of perception."  via perspective. It instigated the "emotional, personal apprehension of the _looming_  infinite."', '148', '', NULL, 0, 0),
(121, 25, 'Kant: Time cannot be finite or infinite. He left this as an antinomy, unresolved.', '222-3', 'kant,', NULL, 0, 0),
(122, 25, 'Manifest Destiny John O''Sullivan 1839, ("the great nation of futurity" [254]) but Great Awakening thought the end was nigh. Walt Whitman "brings the two myths lip to lip." [254] Quotes "Pioneers! O Pioneers!" lines 128-30, 170-5.  "This is the future seen not as promise but as entitlement." ', '252-3', 'USA,', NULL, 0, 0),
(123, 25, ' "To the nineteenth-century settler, the land as more than mere ''stuff.'' It was a plan, a destiny, a biblical foldout. Nature was allegorical and pointed beyond itself."', '256', 'USA,', NULL, 0, 0),
(124, 25, '"By temprament...the American soul believes it _can_ have it both ways, the Edenic and the epic, history and eternity." ', '259', 'USA,', NULL, 0, 0),
(125, 26, ' Idea of progress  assumes there is a pattern in history, that there is a "controlling variable", and that this pattern "has brought and will continue to bring omprovement in the condition of mankind."', '4 intro', '', NULL, 0, 0),
(126, 26, ' other ideas of history: degeneration from a Golden Age, cycles, Providence', '4 intro', '', NULL, 0, 0),
(127, 26, ' for plato and aristotle, the state was like a body, and change was decay once maturity was reached. Aim was to "prevent innovation and the onset of decay."', '8 intro', '', NULL, 0, 0),
(128, 26, ' Polybius (Roman 204bcd-122bce), cycles, the defeat of Carthage was because Carthage was older. "all states had their natural course of growth and decline." Lucreitus: all things are destroyed and begun anew.', '8 intro', '', NULL, 0, 0),
(129, 26, ' Augustine: All history heads in X''s direction. Not cycles. Change is teleological.', '9 intr0', '', NULL, 0, 0),
(130, 26, ' Machiavelli also thought states were organic and thus went through a cycle. The disease that corrupts the state is human selfishness.', '10 intr', '', NULL, 0, 0),
(131, 26, ' Jean Bodin: states follow a cycle, but there is progress in the cycles. Didn''t project this forward indefinitely.', '10-11 intro', '', NULL, 0, 0),
(132, 26, ' Quarrel of the Ancients and Moderns in 17th C: progress because knowledge increases. Descartes: providence not active in nature. Bernard Le Bovier de Fontenelle and Charles Perrault: Human affiars are governed by natural laws.  Pascal: Mankind grows wiser, just as individuals do. Fontenelle: man "will hae no old age...and there will be no end to the growth and development of human wisdom." Finally, progress is normal and natural, although it can be interfered with.', '12 intro', '', NULL, 0, 0),
(133, 26, ' Progress was a result of man''s nature, so "much effort in the eighteenth century was given to illustrating the supposed uniformity of human nature among the peoples of the world, apst and present:" Cgf. Hobbes on "the similitude of the passions" and Father Joseph Lafitau, Adam Ferguson, William Robertson (schottish historian)', '13 intro', '', NULL, 0, 0),
(134, 26, ' Turgot was "easily the greatest intellect of the Englightenment."', '14-15 intro', '', NULL, 0, 0),
(135, 26, ' Turgot: progress because of  accumulation of knowledge (as Locke said). Knowledge has gone through three stages: myth (gods are causes), essences and culties, science. [16] Human mind is the same everywhere.', '15 intro', '', NULL, 0, 0),
(136, 26, ' Condorcet: progress due to knowledge, "the rooting out of erors and prejudices, and in the relase of man from bondage to obsolete institutions." Progress is "necessary and inevitable" [17] saw ten stages (tenth began with French Rev). Progress is a natural tendence, sometimes blocked  by "obstacles" such as bad climate', '16 intro', '', NULL, 0, 0),
(137, 26, ' Comte objected to the individualism of his predecessors. It was creating anarchy. Lookined for what would restore collective unity. Knowledge goes through Turgot''s three stages. Eacg science goes through these stages. Now "social physics" or "sociology" was going through those tages, [19] so that Comte''s own work would form "a theoretical basis for what he called ''the final reorganization of society.''" Human nature has an instinct for betterment [hence the motive force of progress]', '18 intro', '', NULL, 0, 0),
(138, 26, 'JS Mill progress, but because of psychology, not history: cam be deduced from nature of our minds.', '20-1 intro', '', NULL, 0, 0),
(139, 26, ' Marx: "each society...followed an inevitable natural course of change": tribl, clas soc, industrial communism. This is because of the "mode of economic production" [23] Mode of production leads to economic division of labor, rise of private property, class society', '22 intro', '', NULL, 0, 0),
(140, 26, ' Darwin in Descent of Man: natural selection  "acts only tenatively" in advancing society [26] "For Darwin, progress in human affairs appeared less as an inevitability than as a latent tendency that found epxression only under specific conditions."', '25 intro', '', NULL, 0, 0),
(141, 27, '"Criticisms of the model have to be computerised to be believed."', '22', '', NULL, 0, 0),
(142, 27, 'Features of te world model: <li>closed system <li>major parameters are chosen  <li>interations and feedback loops  <li>"use of world averages for all parameters"  <li>"the amount of detail"  <li>"the non-probabilistic nature of its predictions"', '25', '', NULL, 0, 0),
(143, 31, ' how reason is "regrounded or situated by H" ', '41', 'ground,begin', NULL, 0, 1),
(144, 31, ' Problem with reason is that it "appears to owe nothing to the world it reasons about." Thus, things lose their meaning ', '46', 'ground,origin,situation', NULL, 0, 2),
(145, 31, ' "The task, then would not be to arrive at it [the meaning of beings] for the first time, but to remember it." ', '47', '47 time', NULL, 0, 3),
(146, 31, ' "True going-forward is _itself_ a going back." ', '47', 'time', NULL, 0, 4),
(147, 31, ' phil controversies are grounded in a prior disclosure that lets them go forward. ', '49', 'origin, time', NULL, 0, 5),
(148, 31, ' Aristotle: "...interaction between two factors is held to require a precedent community of nature between the factors. De Anima', '50', '', NULL, 0, 6),
(149, 31, ' phil problems arise from abstraction from original "initial inner union" This is the existential a priori, the always already. Comes to us as the future.', '51', 'time', NULL, 0, 7),
(150, 32, ' Why this book? Common heritage, common ontological problem, with divergent answers', 'ix', '', NULL, 0, 1),
(151, 32, ' "They represent two fundamental diredtions or alternative routes that their common philosophical inheritance makes possible at the present time." ', 'ix', 'thrown, history', NULL, 0, 2),
(152, 32, ' The differences in their "lide-style" are "philosophically relevant" ..."becauyse a philosophy is not propounded ina vacuum but by a particular person in a particular historical situation."', 'xii', 'thrown, history', NULL, 0, 3),
(153, 32, ' Subtitle  "is intended to suggest a correlation between ontology and the environment in which it is a proposied -- a correltation tha both thinkers are driven to make."', 'xii', 'thrown', NULL, 0, 4),
(154, 32, ' A risk the bok takes: "above all, an attempt to employ the notions of ''familiarity'', ''community of nature'' and ''place'' as primary ontological categories in interpreting the fundamental significance of H''s and S''s ontologies." ', 'xiv', 'community,already', NULL, 0, 5),
(155, 32, ' Fell reads modern phil as an attempt to find a "third way" out of the "broken totality"', '8', 'thrown', NULL, 0, 6),
(156, 32, 'hrown into a broken world -- broken by philosophy', '', '', NULL, 0, 7),
(157, 32, ' Hegel thought phenomena reveal themselves without residue, an identity of thought and being, which Fell says is a founding thought of Fell''s book which is going to work out the meaning of that identity for H and S', '10', '', NULL, 0, 8),
(158, 32, ' The answer depends on what we take as being the ground of the unity of thought and being ', '11', 'ground', NULL, 0, 9),
(159, 32, ' The community of essences, of subject and object, is the "crucial ontologial problem inherited by H and S from Husserl and, through Husserl, from the modern  ontological tradition." It goes back to Aristotle.', '20', 'prior community', NULL, 0, 10),
(160, 32, ' The three questions he frames for H and S are all about beginning points: where does one begin from (everyday or reduced?) , can ontology avoid metaphysics and human grounding, can phenomena unify being and awareness?', '25-7', '', NULL, 0, 11),
(161, 32, 'Fundamenetal question:"what must the ground of the phenomenon be if the phenonmenon is to be a disclosure of Being?"', '27', '', NULL, 0, 12),
(162, 32, ' SZ is an attempt to heal a broken ontological totality that he inherits from his philosophical predecessors."', '31', 'rupture', NULL, 0, 13),
(163, 32, 'SZ "deals primarily with Da-sein and hence with Sein insofar as it is da." [Being there is an always already out there, like the always already] ', '32', 'rupture, always already', NULL, 0, 14),
(164, 32, ' "The fundamental force of Heidgger''s incessantly repeated expression''always already'' (immer schon) is as a constant reminder that tht the union of essence nd existence, of idea and entityt, that phlosophy seeks to construct out of subjective nd  objective factors is already there in the most ordinary human experience." ', '37-8', 'always already', NULL, 0, 15),
(165, 32, ' inauth = disowning what you already are ', '39', 'authenticity', NULL, 0, 16),
(166, 32, ' cites aristotle precedent community of nature. "''Dasein is the Being of this in between''"', '42-3', 'aristotle', NULL, 0, 17),
(167, 32, ' Dasein is the locale of the truth of Being. The there of beings is the clearing within which objective beings exist', '47', '', NULL, 0, 18),
(168, 32, ' H interprets Western metaphysics as quest for a secure ground. ', '57', 'play', NULL, 0, 19),
(169, 33, '"The entirety of Heidegger''s thinking turn out to be a protratracted efforty at remembering _the place_ in which all human experience...has always come to pass. This lifelong effort was necessary because this place has dissimulated itselfg through the history of metaphysics; the epochs of metaphysics are differing modes of forgetting of the place." ', '29', 'forgetting,hidden', NULL, 0, 1),
(170, 33, ' "metaphysics has unknowingly sought for what is already given." ', '29', 'beginning', NULL, 0, 2),
(171, 33, ' metaphysics counts on a place that is already given in which its positing takes place. "This place, then, has lain in oblivion...inthe way that something very near can be missed... ', '29', 'beginning,hidden, near', NULL, 0, 3),
(172, 33, 'Ge-stell [Com-position] is "the Fourfold''s own self-dissimulation"', '31', 'hidden, fourfold', NULL, 0, 4),
(173, 33, ' To undertstand 4fold have to understand H''s earlier work. [just like Greeks] ', '31', 'beginning', NULL, 0, 5),
(174, 33, 'being toward death and relation to gods: past is repeating or retrieval ', '32', 'time, beginning', NULL, 0, 6),
(175, 33, ' death reveals the nothing that discloses [quoting demske] "the questionableness of beings and thus brings Being itself to appearance"', '33', 'death,hidden,being', NULL, 0, 7),
(176, 33, ' The absence of the gods keeps absolutes out of the picture. ', '35-6', 'absence', NULL, 0, 8),
(177, 34, ' Best way to think about the "other beginning" is "by mediating along with him on this relation" between the Greek beginning and the new beginning. [why?] ', '213', 'greek', NULL, 0, 1),
(178, 34, ' "Thus  it is established that  Standardization dissimulates the  very source of its own being." ', '218', 'authenticity, seeming', NULL, 0, 2),
(179, 34, ' "These passages, which are crucial for my interpretation, argue that the demanding of Standardization receives its ''commission'' (Schickung) from "the center of te whole illimitable relation...", the "self-dissimulating intro-play" of the Four ', '220', 'authenticity, seeming, fourfold', NULL, 0, 3),
(180, 34, ' "It is impossible to overestimage the importance, for the later H''s thinking, of the notion of ''contemporaneity'' (Gleichzeitigkeit)..." > time', '220', '', NULL, 0, 4),
(181, 34, ' "Further and more important for my argument, H stresses that this analuysis applies to _absence_ as well as to presence." ', '221', 'absence', NULL, 0, 5),
(182, 34, ' "H continues, in a passage dserving great stress: ...": there is never mere succession, but "respsecively passing-over and contemporarinety of the early and the late." Fell:"In what sense is absence the presence of a ''concealed fullness''?" ', '221', 'hidden, seeming', NULL, 0, 6),
(183, 34, ' "For Heidegger what has come to be (das Gewesene) first comes to us dissimulated or veiled...", andthat is the problem with Standardization ', '221', 'hidden', NULL, 0, 7),
(184, 34, ' Standardization dis-owns is source ', '222', 'authenticity, hidden', NULL, 0, 8),
(185, 34, 'ME: philosophy as unconcealing but in a way that leaves it concealed (not mere exposure) because of the nature of time: the origin is present. Tie to Aristotle''s for the beginning is more than half of the way. Also Fell''s interest in authenticity. Sartre has no concept of beginning. Tie to my own crisis', '0', '', NULL, 0, 9),
(186, 34, 'Standardization is thus only the Fourfold''s greatest possible self-dissimulation." ', '222', 'hidden,authenticity', NULL, 0, 10),
(187, 34, ' "...appearances cannot be taken at face value but are appearanes of what does not appear." ', '223', 'hidden,seeming,authenticity', NULL, 0, 11),
(188, 34, ' The Fourfold lies hidden, does not show itself at all', '225', 'hidden', NULL, 0, 12);

-- --------------------------------------------------------

--
-- Table structure for table `playlistentries`
--

CREATE TABLE `playlistentries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `user` text NOT NULL,
  `project` text NOT NULL,
  `noteid` int(11) NOT NULL,
  `bookid` int(11) NOT NULL,
  `modified` date DEFAULT NULL,
  `visible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `noteidtitle` (`noteid`,`title`(100))
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `playlistentries`
--

INSERT INTO `playlistentries` (`id`, `title`, `user`, `project`, `noteid`, `bookid`, `modified`, `visible`) VALUES
(1, '<textarea class="topictextclass" onblur="saveTopicBoxTitle(this)"></textarea>', 'dw', 'future', 34, 10, NULL, NULL),
(3, 'future vs. past\n', 'dw', 'Future2', 119, 25, NULL, NULL),
(4, 'future vs. past\n', 'dw', 'Future2', 121, 25, NULL, NULL),
(5, 'future vs. past\n', 'dw', 'Future2', 120, 25, NULL, NULL),
(10, 'past vs. future\n', 'dw', 'Future2', 111, 25, NULL, NULL),
(7, 'past vs. future\n', 'dw', 'Future2', 121, 25, NULL, NULL),
(8, 'past vs. future\n', 'dw', 'Future2', 120, 25, NULL, NULL),
(9, 'future vs. past\n', 'dw', 'Future2', 123, 25, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `user` text,
  `comment` text,
  `created` date DEFAULT NULL,
  `project` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `title`, `user`, `comment`, `created`, `project`) VALUES
(3, 'test title', 'dw', NULL, NULL, 'future'),
(4, 'future vs. past', 'dw', NULL, NULL, 'Future2'),
(5, 'past vs. future', 'dw', NULL, NULL, 'Future2');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  `user` text,
  `created` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `user`, `created`) VALUES
(1, 'future', 'what is the future', 'dw', NULL),
(2, 'Future2', 'totally different future project', 'dw', NULL),
(3, 'infohist', 'the history of information', 'dw', NULL),
(4, 'Fell', 'Joseph%20Fell%20Festschrift', 'dw', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tagid` int(11) NOT NULL AUTO_INCREMENT,
  `tag` text,
  `noteid` int(11) DEFAULT NULL,
  `bookid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tagid`),
  FULLTEXT KEY `tags_index` (`tag`),
  FULLTEXT KEY `tag` (`tag`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=140 ;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tagid`, `tag`, `noteid`, `bookid`) VALUES
(12, 'one', 12, 8),
(11, 'econ', 12, 8),
(13, 'present', 13, 8),
(14, 'two', 13, 8),
(38, '1', 47, 10),
(33, 'readLater', 48, 10),
(32, 'progress', 45, 10),
(31, 'readLater', 45, 10),
(30, 'progress', 44, 10),
(29, 'readLater', 44, 10),
(28, 'progress', 36, 10),
(27, 'readLater', 36, 10),
(26, 'progress', 34, 10),
(25, 'van Doren', 34, 10),
(35, 'progress', 46, 10),
(36, 'readLater', 47, 10),
(37, 'progress', 47, 10),
(39, '1', 34, 10),
(40, '2', 34, 10),
(41, 'tag2', 50, 11),
(42, 'tag3', 51, 11),
(43, 'history', 53, 12),
(44, 'prediction', 69, 16),
(45, 'progress', 74, 16),
(46, 'history', 74, 16),
(47, 'optimism', 77, 16),
(48, 'art', 86, 17),
(49, 'history', 95, 21),
(50, 'data', 95, 21),
(51, 'history', 95, 21),
(52, 'history', 95, 21),
(53, 'pomo', 96, 21),
(54, 'history', 96, 21),
(55, 'history', 96, 21),
(56, 'progress', 98, 21),
(57, 'history', 98, 21),
(58, 'history', 98, 21),
(59, 'internet', 101, 23),
(60, 'progress', 106, 25),
(61, 'egypt', 106, 25),
(62, 'egypt', 106, 25),
(63, 'death', 108, 25),
(64, 'egypt', 108, 25),
(65, 'egypt', 108, 25),
(66, 'death', 109, 25),
(67, 'egypt', 109, 25),
(68, 'egypt', 109, 25),
(69, 'story', 116, 25),
(70, 'Mesopotamia', 116, 25),
(71, 'Mesopotamia', 116, 25),
(72, 'death', 119, 25),
(73, 'Christianity', 119, 25),
(74, 'Christianity', 119, 25),
(75, 'kant', 121, 25),
(76, 'USA', 122, 25),
(77, 'USA', 123, 25),
(78, 'USA', 124, 25),
(79, 'null', 54, 13),
(80, 'ground', 143, 31),
(81, 'begin', 143, 31),
(82, 'ground', 144, 31),
(83, 'origin', 144, 31),
(84, 'situation', 144, 31),
(85, '47 time', 145, 31),
(86, 'time', 146, 31),
(87, 'origin', 147, 31),
(88, 'time', 147, 31),
(89, 'time', 149, 31),
(90, 'thrown', 151, 32),
(91, 'history', 151, 32),
(92, 'thrown', 152, 32),
(93, 'history', 152, 32),
(94, 'thrown', 153, 32),
(95, 'community', 154, 32),
(96, 'already', 154, 32),
(97, 'thrown', 155, 32),
(98, 'ground', 158, 32),
(99, 'prior community', 159, 32),
(100, 'rupture', 162, 32),
(101, 'rupture', 163, 32),
(102, 'always already', 163, 32),
(103, 'always already', 164, 32),
(104, 'authenticity', 165, 32),
(105, 'aristotle', 166, 32),
(106, 'play', 168, 32),
(107, 'forgetting', 169, 33),
(108, 'hidden', 169, 33),
(109, 'beginning', 170, 33),
(110, 'beginning', 171, 33),
(111, 'hidden', 171, 33),
(112, 'near', 171, 33),
(113, 'hidden', 172, 33),
(114, 'fourfold', 172, 33),
(115, 'beginning', 173, 33),
(116, 'time', 174, 33),
(117, 'beginning', 174, 33),
(118, 'death', 175, 33),
(119, 'hidden', 175, 33),
(120, 'being', 175, 33),
(121, 'absence', 176, 33),
(122, 'greek', 177, 34),
(123, 'authenticity', 178, 34),
(124, 'seeming', 178, 34),
(125, 'authenticity', 179, 34),
(126, 'seeming', 179, 34),
(127, 'fourfold', 179, 34),
(128, 'absence', 181, 34),
(129, 'hidden', 182, 34),
(130, 'seeming', 182, 34),
(131, 'hidden', 183, 34),
(132, 'authenticity', 184, 34),
(133, 'hidden', 184, 34),
(134, 'hidden', 186, 34),
(135, 'authenticity', 186, 34),
(136, 'hidden', 187, 34),
(137, 'seeming', 187, 34),
(138, 'authenticity', 187, 34),
(139, 'hidden', 188, 34);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` text,
  `email` text,
  `created` date DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `email`, `created`, `password`) VALUES
(1, 'dw', 'self@evident.com', '0000-00-00', 'nn'),
(2, 'ffff', '', NULL, 'gggg');
