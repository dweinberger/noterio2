# ************************************************************
# Sequel Pro SQL dump
# Version 4004
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.52)
# Database: noterio
# Generation Time: 2013-03-23 21:49:47 -0400
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table books
# ------------------------------------------------------------

DROP TABLE IF EXISTS `books`;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;

INSERT INTO `books` (`bookid`, `author`, `pub`, `date`, `city`, `title`, `translator`, `article`, `vol`, `issue`, `misc`, `type`, `tags`, `journal`, `container`, `url`, `project`, `user`, `nickname`, `pages`, `note`, `isbn`, `parent`)
VALUES
	(8,'David, Paul A.; Thomas, Mark, eds.','Oxford University Press','2003','','Economic Future in Historical Perspective','',NULL,'','','','',NULL,'','','','future','dw','EFHP',NULL,NULL,NULL,NULL),
	(10,'Pollard, Sidney','Basic Books','1968','','The Idea of Progress: History and Society','',NULL,'','','','',NULL,'','','','future','dw','',NULL,NULL,NULL,NULL),
	(11,'auhor,name','pub','jan. 1, 2001','','title','',NULL,'volume','ish','miscagain','type',NULL,'','container','htt[://url.com','infohist','dw','nick',NULL,'note','note',NULL),
	(12,'Knox, Bernard','W.W. Norton & Co.','1994','','Backing into the Future','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(13,'Tuula MittilÃ¤ and Anne-Mari JÃ¤rvelin','Proceedings of the 17th IMP Conference','Sept., 2001','','Expectation Management In Business Relations: Strategies','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(14,'Cova, Bernard; Pace, Stefano; Salle, Robert','','','','Expectation Management in Project Business: A Question of Renunciation','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(15,'Clarke, Arthur C.','','','','Explorations in Tomorrow','',NULL,'','','','',NULL,'','MATF','','Future2','dw','',NULL,'','',NULL),
	(16,'McHale, John','George Brazillier','1969','','The Future of the Future','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(17,'Van Doren, Charles','Frederick A. Praeger','1967','','The Idea of Progress','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(18,'Pavitt, K.L.R','','','','Malthus and Other Economists','',NULL,'','','','',NULL,'','TATF','','Future2','dw','',NULL,'','',NULL),
	(19,'Freeman, Christopher','','','','Malthus with a Computer','',NULL,'','','','',NULL,'','TATF','','Future2','dw','',NULL,'','',NULL),
	(20,'Gunn, James E., ed.','University Press of Kansas','1968','','Man and the Future','',NULL,'','','','',NULL,'','','','Future2','dw','MATF',NULL,'Talks and panel discussions','',NULL),
	(21,'Breisach, Ernst','University of Chicago Press','2003','','On the Future of History: The Postmodernist Challenge and Its Aftermath','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(22,'Churchill, R.C.','Werner Laurie','1955','','A Short History of the Future: Based on the most reliable authorities with maps, etc.','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(23,'Wagar, W. Warren','University of Chicago Press','1987','','A Short History of the Future','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(24,'Cole, H.S.D.; Curnow, R.C.','','','','Evaluation of the World Models','',NULL,'','','','',NULL,'','TATF','','Future2','dw','',NULL,'','',NULL),
	(25,'Maleuvre, Didier','University of California Press','2011','','The Horizon: A History of Our Infinite Longing','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'','',NULL),
	(26,'Teggart, Frederick J.; REvised edition with introduction by George H. Hildebrand','University of California Press','1949','','The Idea of Progress: A Collection of Readings','',NULL,'','','','',NULL,'','','','Future2','dw','',NULL,'Revised edition','Revised edition','TATF'),
	(27,'Cole, H.S.D.','','','','The Structure of the World Models','',NULL,'','','','',NULL,'','TATF','','Future2','dw','',NULL,'Revised edition','Revised edition','TATF'),
	(28,'Cole, H.S.D.; Freeman, Christopher; Jahoda, Marie; Pavitt, K.L.R','Chatto & Windus','1973','','Thinking about the Future: A Critique of The Limits to Growth','',NULL,'','','','anthology',NULL,'','','','Future2','dw','TATF',NULL,'Revised edition','Revised edition',NULL);

/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `noteid` int(11) NOT NULL AUTO_INCREMENT,
  `bookid` int(11) DEFAULT NULL,
  `content` text,
  `page` text,
  `tagstring` text,
  `rating` text,
  PRIMARY KEY (`noteid`),
  FULLTEXT KEY `notes_index` (`content`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;

INSERT INTO `notes` (`noteid`, `bookid`, `content`, `page`, `tagstring`, `rating`)
VALUES
	(14,8,' \"The function of historical economics is too often viewed in much the same way as Descartes and his followers regarded history in general. They thought that it was invariant mathematical laws that held the struths about te nture of the world, and so took history\'s usefulness to consist pirmairly in supplying illusrations of the workings of thos underlying aws.\"','12-13','',NULL),
	(11,8,' NOTES','','',NULL),
	(12,8,' Anthologizes papers presented to an International Symposium in 1999, on the topic of \"The Economic Challenges of the Twenty-First Century in Historical Perspective\" >','xv',' econ',NULL),
	(13,8,' \"presentism\": \"presenting the past not on its own terms, but iwth an eye fixed on the conserns of the moment.\" >','9',' present',NULL),
	(48,10,' \"Manifestly, the idea of science we usually regard as Baconian is rooted in the requirments of the early capitalist economy and technology: its rudiements appear first in the treateises of fifteenth-century craftsmen.\" from Edgar Zilsel, \"Geneis of the idea of scientific progress,\" journal of thisory of ideas, 6 (1945) p[. 346. CF his \"Te Socilogical roots of science,\" American J of Sociology 47 (1943) >','','readLater',NULL),
	(45,10,' The battle of the ancients and the moderns: Could we surpass. Resolved around 1700 See Comte  >','12','readLater',NULL),
	(46,10,' By 1680s and 1690s, philosophers agreed we could surpass the ancients in science and tech. Belief in social prgress was slower.','13','progress',NULL),
	(47,10,' These ideas were rooted in the development of capitalism and of a new class of man.','14-5','readLater',NULL),
	(44,10,'Bishop Bossuet became the but t of Voltaire for not believeing in progress >','','readLater',NULL),
	(43,10,' Francis Bacon (along with Le Roy) thought we could go past the brilliance of the ancients.','8','',NULL),
	(42,10,' Renaissance shattered old beliefs, ushering modern age. \"the first expressins of the belief i pprogress emerged out of the creation of the new science itself...\"','6','',NULL),
	(41,10,' \"[T]here was nthing in the heritage of antiquity to support the idea of human evolution and progress. Experience did not encourage the belief in an updward movement, wile mythology rather suggested a decline from the golden heroic age.\"','5','',NULL),
	(38,10,'Greeks: cyclical history','2','',NULL),
	(39,10,' Judeo-Christian history as a drama, narrative','3','',NULL),
	(40,10,' S. Augustine and Christianity: preparing for the end. No evolution of human history, \"only its apocalyptic end.\"','3-4','',NULL),
	(37,10,'Ancients had no idea of history because they had no experience of change having a direction','2','',NULL),
	(36,10,'ee Turgot, Condorcet >','','readLater',NULL),
	(35,10,' Also implies that this is true for all mankind, and a set of values outside of history itself against which progress can be measured.','vi','',NULL),
	(32,10,'NOTES','','',NULL),
	(33,10,'Belief in progress \"is always in the nature of a scientific prediction, based on the reading of history ... and the operation of laws of social development.\"','v','',NULL),
	(34,10,' Charles Van Doren: belief in progress \"implies the assumption that a pattern of change exists in  the history of mankind, that this pattern is known, that it consists of irreversible changes in one general diection onl, and that this direction is towards improvement from \'a less desirable  to a more desirable state o affairs.\'\" (Van Doren, The Idea of Progress, 1967) >','v','van Doren',NULL),
	(49,11,' NOTES','','',NULL),
	(50,11,'note 1 >','1',' tag2',NULL),
	(51,11,'3note 2>','','tag3',NULL),
	(52,12,' Greek word opiso means \"ilterally \'behind\' or \'back,\' refers not to the past but to the future. The early Greek imagination envisaged the past and the present as in front of us--we can see them. The future invisible, is behind us. Onlu a few very wise men can see what is behind them.\"','11','',NULL),
	(53,12,'From the Christian Church on, we\'ve looked forward to the future. Millennialism. Progress. \"These modern futuramas have their irreconcilable differnces, but they have one thing in common: they all resolutely reject the past.\" ','12','history',NULL),
	(54,13,' \"Expectations have been presented by Alderson and Martin (1965) as one of the three','2','null',NULL),
	(55,13,'imitive terms (or should we say concepts) that together are capable of describing','','',NULL),
	(56,13,'ery kind of system relevant to marketing analysis, the other terms (or concepts) being','','',NULL),
	(57,13,'ts and behaviour. \"','','',NULL),
	(58,13,' \"According to Ojasalo (1999) the nature of expectations can be explicit, implicit, fuzzy,','2','',NULL),
	(59,13,'alistic or unrealistic...\"','','',NULL),
	(60,13,'\"Expectations can also be official or unofficial.\"','3','',NULL),
	(61,13,' Strategies include: intro-recative, extro-reactive, co-reactive, intro-proactive, co-proactive','8-10','',NULL),
	(62,14,'keywords for this paper: Construction, Dreams, Ideal building, Project phases, Suffering.]','','',NULL),
	(63,14,' specially interested in construction industry where expect mgt is a \"major issue\"','2','',NULL),
	(64,14,' \"Expectations cannot be considered as fixed marks. They evolve interacting with the service provided. Rust et al. (1999) show that expectations are constantly updated using a Bayesian framework) and they should be treated as a distribution, not as a constant value.\"','3','',NULL),
	(65,14,' \"The Construction Industry has a reputation for delivering defective buildings late and over cost and consequently not to meet customer expectations. The majority of customers - business customers or end customers - daunted by the reputation of the construction industry are often nervous about seeking new construction and this lack of confidence in the industry may have quite a serious impact upon the quality of the relationship between the customer and the construction company (Cox and Thompson, 1997). At the same time, unrealistic expectations are very frequent in project business. Indeed, the customer faced with a specific and complex problem can develop numerous possible and diverse solutions. Everything is open and the interaction with suppliers during the sale phase of a project adds more uncertainty to this diversity that generates highly unrealistic expectations.\"','4','',NULL),
	(66,15,'Clarke\'s three laws:1. \"If a distinguished but elderl scientist sas tat something is possible e is almost certainly correct. If he was that something is impossible is very probably wrong.\" \"By elderly scinetist I meant anyone over thirty.\" 2. \"The only way one can find the limits of the possible are by goingbeyond them into the impossible.\" 3. \"Any advanced technology is indistinguishable from magic.\"','247-8','',NULL),
	(67,16,' \"Culurally...the idea of the future...is relatively new in human experience. Most  previous societies operated with quite different models... For some, the future was largely a continuation of the past.\" In the East, time was cyclical [p4] In the West, we think of the future as progress.','3','',NULL),
	(68,16,' The West has believed the future is open since the industrial rev.','6','',NULL),
	(69,16,' \"Predicting the future is no longer the business of utopians orlunatics...Prediction...has now come to pervade many sectors of society. Governments and industries alike...foind that they are increasingly forced to think not only of the next ten or twenty years aheadm but of the next fifty -- or even the next hundred years.\" This is because our projects are so complex, e.g., \"To send a anned space vehicle to the moon requires that work on the be project be started maany years before...\" (written in 1969) ','7','prediction',NULL),
	(70,16,' Tech predictions are fairly easy, but social fiutres are not.','8','',NULL),
	(71,16,'\"..man now has an enormously enhanced capacity to choose his future...\" To do this, we need to \"conceptualize\" the future and act.','9','',NULL),
	(72,16,'\"The future of the future is therefore what we degermined it to be...It is directly related to how we conceive of its possibilities potentials, and implications.\"','10','',NULL),
	(73,16,'\"The range of predictions regarding the future is now relatively enormous.\"','10','',NULL),
	(74,16,'Egypt, Persia, India and \"the East\" had a \"long unchanging fixity of world view and a rigidty about the goals and purposes of societies, which did not include any doctrine of even gradual temporal progress...\"','25','progress, history',NULL),
	(75,16,'Romaniticism glorified the past, revivified medievalism','32-4','',NULL),
	(76,16,' Key to industrial age were \"tools to make tools\" i.e. machine tools.  First was  Wilkinson\'s boring mill, in 1775, which made cylinders for Watt\'s steam engine.','','',NULL),
	(77,16,'\"...our present generation now faces the future with globally developed capacities that free man, for he first time, from many of the age-old fears of material scarcity...which have paralyzed his initiative and frustrated his ore innovative directions.\" ','51','optimism',NULL),
	(78,16,'\"A new and more sober assessment of the human condition has emerged, in which opimism regarding man\'s aspirations and potentialitoes is tempered by he implications of his more negative prediclections. Te quality of huanity istf is no longer a God-gien constant, but a self-definition...\"','57','',NULL),
	(79,17,'The work was done collaboratively, says Mortimer Adler in the intro','xi','',NULL),
	(80,17,' All writers who believe in progress think it is irreversible and for the better (Adler in the intro)','xi','',NULL),
	(81,17,' \"Progress, in short, is irreversible meliorative change.\"','3','',NULL),
	(82,17,'  Belief in progress involves four affirmations: (a) \"A definite pattern of change exists in the history of mankind\" b. \"The pattern of change that is manifested in history is not only deisco verable but is also actually known.\" c. \"The existent and known pattern of change in hitory is, in the long run, irreversible in direction.\" d. \"The difetion of he irrevesible pattern of change in hisory is toward the better, i.e., is an improvement in the  state ogf man or an advance from a less to a more desirable state of affairs.\"','4-6','',NULL),
	(83,17,' theories of hisory: progress, cyclical,regress, no pattern, no knowable pattern, can\'t make value judgments about history','8-12','',NULL),
	(84,17,'11 theories of progress. Manifstation of cosmic procrss or totally human. Each divided in two, and each of the 4 is divided. Due to man\'s collective memory, his reason?','26','',NULL),
	(85,17,'Wiener on entropy','155','',NULL),
	(86,17,'Progress in the fine arts? No, says turgot. We reached our height in the Augustan age.','459','art',NULL),
	(87,17,' within progress: a. necessary or contingent; b.  continues or plateaus out; c human nature progresses;','14-15','',NULL),
	(88,18,' Problems with testing complex models: small systematic biases may be hard to detect but have large effects. The parameters are not independent.','111','',NULL),
	(89,19,'The problem with Limits to Growth is the assumptions about the relationships.','7','',NULL),
	(90,19,'This is not a purely technical problem. \"It ids essential to look at the political bias and the values implicitly or explicitly present in any stud of social systems.\"','7','',NULL),
	(91,19,'\"The model is the message.\"','7','',NULL),
	(92,19,'Computer models should not replace mental models, a type of \"computer fetishism.\" \"The compuer fetishist endows the computer model with a validity and indepndent power which altogether transcends he mental models which are its essential basis.\"','8','',NULL),
	(93,19,' \"Computer models cannot replace theory.\"','8','',NULL),
	(94,19,' E.g., it\'s imporant to consider not just rates of growth, but composition and fruits of growth. Also, the MIT group \"is underestimating the possibilities of continuous technical progress.\"','10','',NULL),
	(95,21,' \"In the late 1800s, Carl L. Becker and Henri Berr worried about the viability of history in light of what they saw as the more rapid modernization of the social sciences. They would be joied by Frereick Jackson Turner, James Harvey Robinson, and Karl KAmprecht in calling for and pioneeering a New History.\" They called for  preference be given to \"deep, anonymous sdrucures and forces\" over individuals and events (Turner\'s words) ','3','history, data, history',NULL),
	(96,21,' pomos don\'t want to define pomo because that \"would draw tight orders aroud postmodernism and give preference to one meaning of the term over others,\" and \"that would violate their very injnction against exclusions.\" ','5','pomo, history',NULL),
	(97,21,' Are we in posthistory, \"a period...of infinite with an utterly new mdoe of human life\"','10','',NULL),
	(98,21,'pomos \"chose the most uncompromising variant of progress as their antagonist: progress as the relentless and also merciless march of reason through time toward a totally new stage of human existence.\" a la condorcet . ','12','progress, history',NULL),
	(99,22,' Louis-SÃ©bastien Mercier wrote <em>L\' An 2440</em> in 1772. \"Called by some the Father of Historical Futurity,\" he described Paris in 2440. Women don\'t use cosmetics, they take care of the family, \"Marriages were founded on ove, not money; and anyone could marry anyone else.\"','14','',NULL),
	(100,22,' Mercier: Men don\' wear swords.','15','',NULL),
	(101,23,' This book predicts the future -- written as a look backwards from 200 yrs ahead -- and talks about the \"bibliotel network\" that distributes digitized docuents. \"By the year 2030, the bibliotel etwork werved more than twenty iollio institutioal and indivirual subscribers in all countries. It held electroic copeis of ine-tenths of all te books, periodicals and achival colletios in the world; Supplekentary fees were charged for cpojsultig works still under copyright. Most of the world\'s great gresearch libraries and archives were covertd into museums, visited more by tourists than by scholars.\" [So small because The World biblioel sutek as \"oeprated by WT&T\". It all \"could have been made available to any purhcasr at cost. Buyt WT&T jealously guarded its hoard...\" and \"was he only available resource\" [88-9] ','','internet',NULL),
	(102,24,'Problems with testing complex models: small systematic biases may be hard to detect but have large effects. The parameters are not independent.','111','',NULL),
	(103,25,' \"This vanishing -- the trace of human vision seeing itself out -- is indeed what we mean by horizon.\"','2','',NULL),
	(104,25,'\"_Horizon_ highlights the subjective, makeshift nature of perceiived reality.\"','2','',NULL),
	(105,25,'\"No one can logically or practically travel through the horizon.\"','4','',NULL),
	(106,25,' Egypt\'s \"cultic activities\" all assumed \"the desirability of permanence, cyclical stability, and the absence of progress. No other culture has quite matched the ancient Egyptians in so single-mindedly [12] mobilizing against change.\"  3,000 years','11','progress, egypt',NULL),
	(107,25,'\"This fixation on permanence seems to be the oldest prevailing feature of the Egyptian civilization.\"','12','',NULL),
	(108,25,'\"The three-millennium long tradition of apothecary burial rites...suggests the prospect of a rather domestic, physical afterlife....And where death promised ever more of the same, the same smacked ever more of death.\"','13','death, egypt',NULL),
	(109,25,' \"In ancient Egypt, the denial of finitude was not just an aspect of civilization but its driving force...\" ','14','death, egypt',NULL),
	(110,25,' Egypt didn\'t see our origins as coming from a moment long ago (although they had a misty idea) but \"as a daily occurrent, hence cyclical and timeless, that coincided with the sunrise.\" \"Accordfingly the gods were praised not for spawning the world, but for begettging and maintaining it daily.\"','14','',NULL),
	(111,25,' The Babylonians and Greeks \"accepted change and death as elements of the cosmic balnace.\"','14-15','',NULL),
	(112,25,' \"The Egyptian worldview...represented the world seen from no particular standpoint.\" They showed what they knew [18-19]: they knew humans have two legs so they always show them. Appearance was being for them. Ra creates the world anew every morning by blinking. [20:] there is only one right place to view an Egyptian statue, unlike Greek that invite you look at it from different angles.','18','',NULL),
	(113,25,'Egyptian horizon is \"not a gateway to the unseen, but a sentry cordon that brackets off any inkling of escape.\"','21','',NULL),
	(114,25,' Exception: 17-yr rule of King Amenhotep IV. One god: Aten. Sunlight. Couldn\'t be captured in images. [25] Art now shows pictures of real life, unidealized figures including the king.','24','',NULL),
	(115,25,'The opening  of the Gilgamesh says it will tell us of the life and deeds of Gilgamesh. \"To see and know all: alive already is the impulse to shape life into a finite hwhole...\"','30','',NULL),
	(116,25,'It\'s going to tell us all. \"The premise, and promise, of any story is that it conveys _all_ there is to say...\" \"We have fiction  so as to see  life as a fintie sum--to jump beyond the horizon and behold the whole thing, round like the Earth seen from outer space.\" ','31','story, Mesopotamia',NULL),
	(117,25,'Odysseus is a hero \"hankering after the human lot.\"','40','',NULL),
	(118,25,'Genesis leads us to entertain \"a situation where the world is nothing but a possibility.\"','53','',NULL),
	(119,25,' \"The human condition is a gateway.\" \"In essence, the Christina religion suggested that we are not what we are; that we are what we _will_ be -- gods in waiting. Our essence is potentiality, not actuality.\" ','103','death, Christianity',NULL),
	(120,25,' \"The Renaissance...moved the infinite into the field of perception.\"  via perspective. It instigated the \"emotional, personal apprehension of the _looming_  infinite.\"','148','',NULL),
	(121,25,'Kant: Time cannot be finite or infinite. He left this as an antinomy, unresolved.','222-3','kant,',NULL),
	(122,25,'Manifest Destiny John O\'Sullivan 1839, (\"the great nation of futurity\" [254]) but Great Awakening thought the end was nigh. Walt Whitman \"brings the two myths lip to lip.\" [254] Quotes \"Pioneers! O Pioneers!\" lines 128-30, 170-5.  \"This is the future seen not as promise but as entitlement.\" ','252-3','USA,',NULL),
	(123,25,' \"To the nineteenth-century settler, the land as more than mere \'stuff.\' It was a plan, a destiny, a biblical foldout. Nature was allegorical and pointed beyond itself.\"','256','USA,',NULL),
	(124,25,'\"By temprament...the American soul believes it _can_ have it both ways, the Edenic and the epic, history and eternity.\" ','259','USA,',NULL),
	(125,26,' Idea of progress  assumes there is a pattern in history, that there is a \"controlling variable\", and that this pattern \"has brought and will continue to bring omprovement in the condition of mankind.\"','4 intro','',NULL),
	(126,26,' other ideas of history: degeneration from a Golden Age, cycles, Providence','4 intro','',NULL),
	(127,26,' for plato and aristotle, the state was like a body, and change was decay once maturity was reached. Aim was to \"prevent innovation and the onset of decay.\"','8 intro','',NULL),
	(128,26,' Polybius (Roman 204bcd-122bce), cycles, the defeat of Carthage was because Carthage was older. \"all states had their natural course of growth and decline.\" Lucreitus: all things are destroyed and begun anew.','8 intro','',NULL),
	(129,26,' Augustine: All history heads in X\'s direction. Not cycles. Change is teleological.','9 intr0','',NULL),
	(130,26,' Machiavelli also thought states were organic and thus went through a cycle. The disease that corrupts the state is human selfishness.','10 intr','',NULL),
	(131,26,' Jean Bodin: states follow a cycle, but there is progress in the cycles. Didn\'t project this forward indefinitely.','10-11 intro','',NULL),
	(132,26,' Quarrel of the Ancients and Moderns in 17th C: progress because knowledge increases. Descartes: providence not active in nature. Bernard Le Bovier de Fontenelle and Charles Perrault: Human affiars are governed by natural laws.  Pascal: Mankind grows wiser, just as individuals do. Fontenelle: man \"will hae no old age...and there will be no end to the growth and development of human wisdom.\" Finally, progress is normal and natural, although it can be interfered with.','12 intro','',NULL),
	(133,26,' Progress was a result of man\'s nature, so \"much effort in the eighteenth century was given to illustrating the supposed uniformity of human nature among the peoples of the world, apst and present:\" Cgf. Hobbes on \"the similitude of the passions\" and Father Joseph Lafitau, Adam Ferguson, William Robertson (schottish historian)','13 intro','',NULL),
	(134,26,' Turgot was \"easily the greatest intellect of the Englightenment.\"','14-15 intro','',NULL),
	(135,26,' Turgot: progress because of  accumulation of knowledge (as Locke said). Knowledge has gone through three stages: myth (gods are causes), essences and culties, science. [16] Human mind is the same everywhere.','15 intro','',NULL),
	(136,26,' Condorcet: progress due to knowledge, \"the rooting out of erors and prejudices, and in the relase of man from bondage to obsolete institutions.\" Progress is \"necessary and inevitable\" [17] saw ten stages (tenth began with French Rev). Progress is a natural tendence, sometimes blocked  by \"obstacles\" such as bad climate','16 intro','',NULL),
	(137,26,' Comte objected to the individualism of his predecessors. It was creating anarchy. Lookined for what would restore collective unity. Knowledge goes through Turgot\'s three stages. Eacg science goes through these stages. Now \"social physics\" or \"sociology\" was going through those tages, [19] so that Comte\'s own work would form \"a theoretical basis for what he called \'the final reorganization of society.\'\" Human nature has an instinct for betterment [hence the motive force of progress]','18 intro','',NULL),
	(138,26,'JS Mill progress, but because of psychology, not history: cam be deduced from nature of our minds.','20-1 intro','',NULL),
	(139,26,' Marx: \"each society...followed an inevitable natural course of change\": tribl, clas soc, industrial communism. This is because of the \"mode of economic production\" [23] Mode of production leads to economic division of labor, rise of private property, class society','22 intro','',NULL),
	(140,26,' Darwin in Descent of Man: natural selection  \"acts only tenatively\" in advancing society [26] \"For Darwin, progress in human affairs appeared less as an inevitability than as a latent tendency that found epxression only under specific conditions.\"','25 intro','',NULL),
	(141,27,'\"Criticisms of the model have to be computerised to be believed.\"','22','',NULL),
	(142,27,'Features of te world model: <li>closed system <li>major parameters are chosen  <li>interations and feedback loops  <li>\"use of world averages for all parameters\"  <li>\"the amount of detail\"  <li>\"the non-probabilistic nature of its predictions\"','25','',NULL);

/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table playlistentries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `playlistentries`;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `playlistentries` WRITE;
/*!40000 ALTER TABLE `playlistentries` DISABLE KEYS */;

INSERT INTO `playlistentries` (`id`, `title`, `user`, `project`, `noteid`, `bookid`, `modified`, `visible`)
VALUES
	(1,'<textarea class=\"topictextclass\" onblur=\"saveTopicBoxTitle(this)\"></textarea>','dw','future',34,10,NULL,NULL),
	(3,'future vs. past\n','dw','Future2',119,25,NULL,NULL),
	(4,'future vs. past\n','dw','Future2',121,25,NULL,NULL),
	(5,'future vs. past\n','dw','Future2',120,25,NULL,NULL),
	(10,'past vs. future\n','dw','Future2',111,25,NULL,NULL),
	(7,'past vs. future\n','dw','Future2',121,25,NULL,NULL),
	(8,'past vs. future\n','dw','Future2',120,25,NULL,NULL),
	(9,'future vs. past\n','dw','Future2',123,25,NULL,NULL);

/*!40000 ALTER TABLE `playlistentries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table playlists
# ------------------------------------------------------------

DROP TABLE IF EXISTS `playlists`;

CREATE TABLE `playlists` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` text,
  `user` text,
  `comment` text,
  `created` date DEFAULT NULL,
  `project` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;

INSERT INTO `playlists` (`id`, `title`, `user`, `comment`, `created`, `project`)
VALUES
	(3,'test title','dw',NULL,NULL,'future'),
	(4,'future vs. past','dw',NULL,NULL,'Future2'),
	(5,'past vs. future','dw',NULL,NULL,'Future2');

/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table projects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  `user` text,
  `created` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;

INSERT INTO `projects` (`id`, `name`, `description`, `user`, `created`)
VALUES
	(1,'future','what is the future','dw',NULL),
	(2,'Future2','totally different future project','dw',NULL),
	(3,'infohist','the history of information','dw',NULL);

/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `tagid` int(11) NOT NULL AUTO_INCREMENT,
  `tag` text,
  `noteid` int(11) DEFAULT NULL,
  `bookid` int(11) DEFAULT NULL,
  PRIMARY KEY (`tagid`),
  FULLTEXT KEY `tags_index` (`tag`),
  FULLTEXT KEY `tag` (`tag`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`tagid`, `tag`, `noteid`, `bookid`)
VALUES
	(12,'one',12,8),
	(11,'econ',12,8),
	(13,'present',13,8),
	(14,'two',13,8),
	(38,'1',47,10),
	(33,'readLater',48,10),
	(32,'progress',45,10),
	(31,'readLater',45,10),
	(30,'progress',44,10),
	(29,'readLater',44,10),
	(28,'progress',36,10),
	(27,'readLater',36,10),
	(26,'progress',34,10),
	(25,'van Doren',34,10),
	(35,'progress',46,10),
	(36,'readLater',47,10),
	(37,'progress',47,10),
	(39,'1',34,10),
	(40,'2',34,10),
	(41,'tag2',50,11),
	(42,'tag3',51,11),
	(43,'history',53,12),
	(44,'prediction',69,16),
	(45,'progress',74,16),
	(46,'history',74,16),
	(47,'optimism',77,16),
	(48,'art',86,17),
	(49,'history',95,21),
	(50,'data',95,21),
	(51,'history',95,21),
	(52,'history',95,21),
	(53,'pomo',96,21),
	(54,'history',96,21),
	(55,'history',96,21),
	(56,'progress',98,21),
	(57,'history',98,21),
	(58,'history',98,21),
	(59,'internet',101,23),
	(60,'progress',106,25),
	(61,'egypt',106,25),
	(62,'egypt',106,25),
	(63,'death',108,25),
	(64,'egypt',108,25),
	(65,'egypt',108,25),
	(66,'death',109,25),
	(67,'egypt',109,25),
	(68,'egypt',109,25),
	(69,'story',116,25),
	(70,'Mesopotamia',116,25),
	(71,'Mesopotamia',116,25),
	(72,'death',119,25),
	(73,'Christianity',119,25),
	(74,'Christianity',119,25),
	(75,'kant',121,25),
	(76,'USA',122,25),
	(77,'USA',123,25),
	(78,'USA',124,25),
	(79,'null',54,13);

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` text,
  `email` text,
  `created` date DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`userid`, `username`, `email`, `created`, `password`)
VALUES
	(1,'dw','self@evident.com','0000-00-00','nn'),
	(2,'ffff','',NULL,'gggg');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
