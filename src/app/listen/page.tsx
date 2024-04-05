import Link from "next/link";

interface Download {
  title: string;
  path: string;
}
interface Section {
  group: string;
  title: string;
  songs: Download[];
  zip?: string;
}

const sections: Section[] = [
  {
    group: "home",
    title: "",
    songs: [
      {
        title: "Abu Jamal",
        path: "AbuJamal.mp3",
      },
      {
        title: "Angel's Poem",
        path: "AnglesPoem.wav",
      },
      {
        title: "City vs. Country",
        path: "CityVsCountry.mp3",
      },
      {
        title: "Fire Above Us",
        path: "FireAboveUs.wav",
      },
      {
        title: "Honeymoon is Over",
        path: "HoneymoonIsOver.mp3",
      },
      {
        title: "Howdy-D-Burger Drive-In",
        path: "HowdyDBurgerDrivein.mp3",
      },
      {
        title: "I Like Gumby",
        path: "ILikeGumby.mp3",
      },
      {
        title: "I'm a Jerk",
        path: "ImAJerk.mp3",
      },
      {
        title: "It's Afternoon and the Range Is Calling",
        path: "ItsAfternoonAndTheRangeIsCalling.mp3",
      },
      {
        title: "My Heart Was Won By a Girl",
        path: "MyHeartWasWonByAGirl_mcabes.mp3",
      },
      {
        title: "Older Girl",
        path: "OlderGirl_AustinTxNov292013.mp3",
      },
      {
        title: "Our Time Is Now",
        path: "OurTimeIsNow.mp3",
      },
      {
        title: "Spanish Song",
        path: "SpanishSong.wav",
      },
      {
        title: "Tell How You Feel",
        path: "TellHowYouFeel.mp3",
      },
      {
        title: "The Bitter Herb",
        path: "TheBitterHerb_baltimore.mp3",
      },
      {
        title: "We Had a Fight Last Night",
        path: "WeHadAFightLastNight.wav",
      },
      {
        title: "When She Laughs It's Like a Trumpet",
        path: "WhenSheLaughsItsLikeATrumpet.wav",
      },
      {
        title: "When We Refuse To Suffer",
        path: "WhenWeRefuseToSuffer_carborro2013.mp3",
      },
      {
        title: "When We Refuse To Suffer",
        path: "WhenWeRefuseToSuffer_carborro2013.wav",
      },
      {
        title: "When We Run On the Beach",
        path: "WhenWeRunOntheBeach.mp3",
      },
      {
        title: "A Fine Sense Of Humor",
        path: "aFineSenseOfHumor.mp3",
      },
      {
        title: "A Higher Power",
        path: "aHigherPower.mp3",
      },
      {
        title: "Abominable Snowman In the Supermarket",
        path: "abdominalSnowmanInTheSupermarket.mp3",
      },
      {
        title: "Abdul and Cleopatra",
        path: "abdulandcleopatra.mp3",
      },
      {
        title: "Action Packed",
        path: "actionPacked.mp3",
      },
      {
        title: "Affection",
        path: "affection.mp3",
      },
      {
        title: "Affection",
        path: "affectionSantaCruz.mp3",
      },
      {
        title: "Ancient Long Ago",
        path: "ancientLongAgo.mp3",
      },
      {
        title: "Astral Plane",
        path: "astralPlane.mp3",
      },
      {
        title: "Because Her Beauty Is Raw and Wild",
        path: "becauseHerBeautyIsRawAndWild.mp3",
      },
      {
        title: "They Showed Me the Door to Bohemia",
        path: "bohemia.mp3",
      },
      {
        title: "They Showed Me the Door to Bohemia",
        path: "bohemiaAsheville.mp3",
      },
      {
        title: "Bohemia",
        path: "bohemiaNashville.mp3",
      },
      {
        title: "Boston, USA",
        path: "bostonUSA.mp3",
      },
      {
        title: "Bundle Of Joy",
        path: "bundleOfJoy.mp3",
      },
      {
        title: "Celestial",
        path: "celestialAsheville.mp3",
      },
      {
        title: "Closer",
        path: "closer.mp3",
      },
      {
        title: "Corner Store",
        path: "cornerStore.mp3",
      },
      {
        title: "Crazy Eddie",
        path: "crazieEddie.mp3",
      },
      {
        title: "Crazy Eddie",
        path: "crazyEddie1979.mp3",
      },
      {
        title: "Cupid",
        path: "cupid.mp3",
      },
      {
        title: "Dancing Late At Night",
        path: "dancingLateAtNight.mp3",
      },
      {
        title: "Dick Gregory",
        path: "dickGregory.mp3",
      },
      {
        title: "Dodge Veg-O-Matic",
        path: "dodgeVegoMatic.mp3",
      },
      {
        title: "Ego Went Away",
        path: "egoWentAway.mp3",
      },
      {
        title: "Everyday Clothes",
        path: "everydayClothes.mp3",
      },
      {
        title: "For Drama We Have the Seasons",
        path: "forDramaWeHaveTheSeasons.mp3",
      },
      {
        title: "French Style",
        path: "frenchStyle.mp3",
      },
      {
        title: "Gail Loves Me",
        path: "gailLovesMe.mp3",
      },
      {
        title: "Gail Loves Me",
        path: "gailLovesMe1.mp3",
      },
      {
        title: "Get in the Groove",
        path: "getInTheGroove.mp3",
      },
      {
        title: "Give Paris One More Chance",
        path: "giveParisOneMoreChance.mp3",
      },
      {
        title: "Good Night Baby",
        path: "goodNightBaby.mp3",
      },
      {
        title: "Government Center",
        path: "governmentCenter.mp3",
      },
      {
        title: "Her Love Is From Somewhere Else",
        path: "herLoveIsFromSomewhereElse.mp3",
      },
      {
        title: "Hi Dear",
        path: "hiDear.mp3",
      },
      {
        title: "I Can't Sleep Now",
        path: "iCantSleepNow.mp3",
      },
      {
        title: "I Eat With Gusto",
        path: "iEatWithGusto.mp3",
      },
      {
        title: "I Have Come Out To Play",
        path: "iHaveComeOutToPlay.mp3",
      },
      {
        title: "I Love Hot Nights",
        path: "iLoveHotNights.mp3",
      },
      {
        title: "Ice Cold Nugrape",
        path: "iceColdNugrape.mp3",
      },
      {
        title: "I'm a Jerk",
        path: "imAJerk.mp3",
      },
      {
        title: "I'm Gonna Walk Up the Street",
        path: "imGonnaWalkUpTheStreet.mp3",
      },
      {
        title: "I'm Natures Mosquito",
        path: "imNaturesMosquito.mp3",
      },
      {
        title: "I'm Straight",
        path: "imStraight.mp3",
      },
      {
        title: "I'm Your God Pan",
        path: "imYourGodPan.mp3",
      },
      {
        title: "Important In Your Life",
        path: "importantInYourLife.mp3",
      },
      {
        title: "Instrumental",
        path: "instrumental.mp3",
      },
      {
        title: "Interview",
        path: "interview.mp3",
      },
      {
        title: "It Will Stand",
        path: "itWillStand.mp3",
      },
      {
        title: "It Will Stand",
        path: "itWillStandTampa.mp3",
      },
      {
        title: "Jonathan I Feel So Bad",
        path: "jonathanIFeelSoBad.mp3",
      },
      {
        title: "Just About 17",
        path: "justAbout17.mp3",
      },
      {
        title: "Just About 17",
        path: "justAbout17Brussles.mp3",
      },
      {
        title: "Just Wanna Be Young",
        path: "justWannaBeYoung.mp3",
      },
      {
        title: "Les Etoiles",
        path: "lesEtoiles.mp3",
      },
      {
        title: "Let's Get Wild",
        path: "letsGetWild.mp3",
      },
      {
        title: "Lonely Financial Zone",
        path: "lonelyFinancialZone.mp3",
      },
      {
        title: "Lonely Without Her",
        path: "lonelyWithoutHer.mp3",
      },
      {
        title: "Love Me Like I Love",
        path: "loveMeLikeILove.mp3",
      },
      {
        title: "Love Me Like I Love",
        path: "loveMeLikeILoveParis.mp3",
      },
      {
        title: "Make a Mistake",
        path: "makeAMistake.mp3",
      },
      {
        title: "Michael Row Your Boat Ashore",
        path: "michaelRowYourBoatAshore.mp3",
      },
      {
        title: "Mr. Sorrow",
        path: "mrSorrow.wav",
      },
      {
        title: "My Appearance on the Balcony",
        path: "myAppearanceOnTheBalcony.mp3",
      },
      {
        title: "My Career As a Homewrecker",
        path: "myCareerAsAHomewrecker.mp3",
      },
      {
        title: "My Heart Was Won By a Girl",
        path: "myHeartWasWonByAGirl.mp3",
      },
      {
        title: "My Honest Dear",
        path: "myHonestDear.mp3",
      },
      {
        title: "My Little Kookenhaken",
        path: "myLittleKookenhaken.mp3",
      },
      {
        title: "My Modern Lover",
        path: "myModernLover.mp3",
      },
      {
        title: "Mystery Of the Summer Night",
        path: "mysteryOfTheSummerNight.mp3",
      },
      {
        title: "Neon Sign",
        path: "neonSign.mp3",
      },
      {
        title: "Nineteen In Naples",
        path: "nineteenInNaples.mp3",
      },
      {
        title: "Older Girl",
        path: "olderGirl.mp3",
      },
      {
        title: "Our Drab Ways",
        path: "ourDrabWays.mp3",
      },
      {
        title: "Our Time Is Now",
        path: "ourTimeIsNowRex.mp3",
      },
      {
        title: "Our Time Is Now",
        path: "ourTimeIsNowStudio.mp3",
      },
      {
        title: "Pablo Picasso",
        path: "pabloPicasso.mp3",
      },
      {
        title: "Roadrunner",
        path: "roadrunner.mp3",
      },
      {
        title: "Rock Island Line",
        path: "rockIslandLine.mp3",
      },
      {
        title: "Rockin' Shoppin' Center",
        path: "rockinShoppinCenter.mp3",
      },
      {
        title: "Roller Coaster By the Sea",
        path: "rollerCoasterByTheSea.mp3",
      },
      {
        title: "Roller Coaster By the Sea",
        path: "rollerCoasterByTheSea1.mp3",
      },
      {
        title: "Satisfy",
        path: "satisfy.mp3",
      },
      {
        title: "Sex Machine",
        path: "sexMachine.mp3",
      },
      {
        title: "She Brings Out the Best In Me",
        path: "sheBringsOutTheBestInMe.mp3",
      },
      {
        title: "Shirin and Fahrad",
        path: "shirinAndFahrad.mp3",
      },
      {
        title: "Shirin and Fahrad",
        path: "shirinAndFahradJonathanSwifts.mp3",
      },
      {
        title: "Someone I Care About",
        path: "someoneICareAbout.mp3",
      },
      {
        title: "Something You Love",
        path: "somethingYouLove.mp3",
      },
      {
        title: "Song Of Remembrance",
        path: "songOfRemembrance.mp3",
      },
      {
        title: "Spring Time In New York",
        path: "springTimeInNewYork.mp3",
      },
      {
        title: "Such Loneliness",
        path: "suchLonliness.mp3",
      },
      {
        title: "Summer Morning",
        path: "summerMorning.mp3",
      },
      {
        title: "The Tag Game",
        path: "tagGame.mp3",
      },
      {
        title: "Take Me to the Plaza",
        path: "takeMeToThePlaza.mp3",
      },
      {
        title: "Take Me to the Plaza",
        path: "takeMeToThePlaza506.mp3",
      },
      {
        title: "That Summer Feeling",
        path: "thatSummerFeelingNashville.mp3",
      },
      {
        title: "The Baltimores",
        path: "theBaltimores.mp3",
      },
      {
        title: "The Fenway",
        path: "theFenway.mp3",
      },
      {
        title: "The Heart Of Saturday Night",
        path: "theHeartOfSaturdayNight.mp3",
      },
      {
        title: "The New Teller",
        path: "theNewTeller.mp3",
      },
      {
        title: "The Night Is Still Young",
        path: "theNightIsStillYoung.mp3",
      },
      {
        title: "The Silent Treatment",
        path: "theSilentTreatment.mp3",
      },
      {
        title: "The Sweeping Wind",
        path: "theSweepingWind.mp3",
      },
      {
        title: "The UFO Man",
        path: "theUFOMan.mp3",
      },
      {
        title: "The World Is Showing It's Hand",
        path: "theWorldIsShowingItsHand.mp3",
      },
      {
        title: "There Was a Little Girl Who Had a Little Curl",
        path: "thereWasALittleGirlWhoHadALittleCurl.mp3",
      },
      {
        title: "These Bodies",
        path: "theseBodies.mp3",
      },
      {
        title: "Touched More",
        path: "touchedMore.mp3",
      },
      {
        title: "Trash on the Beach",
        path: "trashOnTheBeach.mp3",
      },
      {
        title: "Unknown",
        path: "unknown.mp3",
      },
      {
        title: "Up In the Sky Sometime",
        path: "upInTheSkySometime.mp3",
      },
      {
        title: "Vampire Girl",
        path: "vampireGirl.mp3",
      },
      {
        title: "Veil Of Cold",
        path: "veilOfCold.mp3",
      },
      {
        title: "Velvet Underground",
        path: "velvetUnderground.mp3",
      },
      {
        title: "Velvet Underground",
        path: "velvetUndergroundSUNY.mp3",
      },
      {
        title: "Walter Johnson",
        path: "walterJohnson.mp3",
      },
      {
        title: "When Harpo Played His Harp",
        path: "whenHarpoPlayedHisHarp.mp3",
      },
      {
        title: "When She Kisses Me",
        path: "whenSheKissesMe.mp3",
      },
      {
        title: "Wild Wild Party",
        path: "wildwildParty.mp3",
      },
      {
        title: "Winter Is Over For Me",
        path: "winterIsOverForMe.mp3",
      },
      {
        title: "Winters Get Hard In New England",
        path: "wintersGetHardInNewEngland.mp3",
      },
      {
        title: "Winters Get Hard In New England",
        path: "wintersGetHardInNewEngland_acetate.mp3",
      },
      {
        title: "You Can Have a Cell Phone But Not Me",
        path: "youCanHaveACellPhoneButNotMe.mp3",
      },
      {
        title: "You Can't Talk to the Dude",
        path: "youCantTalkToTheDude.mp3",
      },
      {
        title: "Your Crazy For Taking the Bus",
        path: "yourCrazyForTakingTheBus.mp3",
      },
    ],
  },

  {
    group: "goldStar",
    title: "Gold Star Lost Recordings",
    zip: "goldStar.zip",
    songs: [
      {
        title: "Nuclear Nightmare",
        path: "01nuclearNightmare.wav",
      },
      {
        title: "Cupid",
        path: "02cupid.wav",
      },
      {
        title: "Let's Take the Long Way Home",
        path: "03letsTakeTheLongWayHome.wav",
      },
      {
        title: "Up In the Sky Sometime",
        path: "04upInTheSkySometime.wav",
      },
    ],
  },

  {
    group: "8182",
    title: "81'-82' Compilation",
    zip: "8182.zip",
    songs: [
      {
        title: "Ice Cream Man",
        path: "01iceCreamMan.mp3",
      },
      {
        title: "I Love Life So",
        path: "02iLoveLifeSo.mp3",
      },
      {
        title: "The Neighbors",
        path: "03theNeighbors.mp3",
      },
      {
        title: "Are You Feeling Good",
        path: "04areYouFeelingGood.mp3",
      },
      {
        title: "Back In Your Life",
        path: "05backInYourLife.mp3",
      },
      {
        title: "Tahetian Hop",
        path: "06tahetianHop.mp3",
      },
      {
        title: "Bring Back Springtime to the World of Nature",
        path: "07bringBackSpringtimeToTheWorldOfNature.mp3",
      },
      {
        title: "That Is Rock-n-Roll",
        path: "08thatIsRocknRoll.mp3",
      },
      {
        title: "My Name Is Jonathan",
        path: "09myNameIsJonathan.mp3",
      },
      {
        title: "Rockin' Rockin' Leprechauns",
        path: "10rockinRockinLeprechauns.mp3",
      },
      {
        title: "Somebody To Hold Me",
        path: "11somebodyToHoldMe.mp3",
      },
      {
        title: "Important In Your Life",
        path: "12importantInYourLife.mp3",
      },
      {
        title: "She's Running Away",
        path: "13shesRunningAway.mp3",
      },
      {
        title: "I Love Her Little Body",
        path: "14iLoveHerLittleBody.mp3",
      },
      {
        title: "The New Teller",
        path: "15theNewTeller.mp3",
      },
      {
        title: "Our Time Is Now",
        path: "16ourTimeIsNow.mp3",
      },
    ],
  },

  {
    group: "moreSurprises",
    title: "More Surprises",
    zip: "moreSurprises.zip",
    songs: [
      {
        title: "More Surprises",
        path: "01moreSurprises.mp3",
      },
      {
        title: "Rock and Roll Will Happen",
        path: "02rockAndRollWillHappen.mp3",
      },
      {
        title: "I Love You So",
        path: "03iLoveYouSo.mp3",
      },
      {
        title: "At Home With a Lover",
        path: "04atHomeWithALover.mp3",
      },
      {
        title: "Five Year Old Feeling",
        path: "05fiveYearOldFeeling.mp3",
      },
      {
        title: "Give Her Time",
        path: "06giveHerTime.mp3",
      },
      {
        title: "Heart To Heart",
        path: "07heartToHeart.mp3",
      },
      {
        title: "Hi Fred",
        path: "08hiFred.mp3",
      },
      {
        title: "I Love People",
        path: "09iLovePeople.mp3",
      },
      {
        title: "I Love This World and it's Mystery",
        path: "10iLoveThisWorldAndItsMystery.mp3",
      },
      {
        title: "I'm Your God Pan",
        path: "11imYourGodPan.mp3",
      },
      {
        title: "I See What's Underneath",
        path: "12iSeeWhatsUnderneath.mp3",
      },
      {
        title: "I Want To Love Him So Bad",
        path: "13iWantToLoveHimSoBad.mp3",
      },
      {
        title: "Let's Say We Just Met",
        path: "14letsSayWeJustMet.mp3",
      },
      {
        title: "My Runabout Girl",
        path: "15myRunaboutGirl.mp3",
      },
      {
        title: "New Kind Of Neighborhood",
        path: "16newKindOfNeighborhood.mp3",
      },
      {
        title: "Tell How You Feel",
        path: "17tellHowYouFeel.mp3",
      },
      {
        title: "That's the Way I Feel",
        path: "18thatsTheWayIFeel.mp3",
      },
      {
        title: "That's When I Want To Tear the Walls Down",
        path: "19thatsWhenIWantToTearTheWallsDown.mp3",
      },
      {
        title: "The Desert",
        path: "20theDesert.mp3",
      },
      {
        title: "Time For Fooling Around",
        path: "21timeForFoolingAround.mp3",
      },
      {
        title: "The Best That I Have Got",
        path: "22theBestThatIHaveGot.mp3",
      },
    ],
  },

  {
    group: "jonathanSingsLive",
    title: "Jonathan Sings Live",
    zip: "jonathanSingsLive.zip",
    songs: [
      {
        title: "That Summer Feeling",
        path: "01thatSummerFeeling.mp3",
      },
      {
        title: "This Kind Of Music",
        path: "02thisKindOfMusic.mp3",
      },
      {
        title: "The Neighbors",
        path: "03theNeighbors.mp3",
      },
      {
        title: "Somebody To Hold Me",
        path: "04somebodyToHoldMe.mp3",
      },
      {
        title: "Those Conga Drums",
        path: "05thoseCongaDrums.mp3",
      },
      {
        title: "Stop This Car",
        path: "06stopThisCar.mp3",
      },
      {
        title: "Not Yet Three",
        path: "07notYetThree.mp3",
      },
      {
        title: "Give Paris One More Chance",
        path: "08giveParisOneMoreChance.mp3",
      },
      {
        title: "Your the One For Me",
        path: "09yourTheOneForMe.mp3",
      },
      {
        title: "When I'm Walking",
        path: "10whenImWalking.mp3",
      },
      {
        title: "The Tag Game",
        path: "11theTagGame.mp3",
      },
      {
        title: "Dick Gregory",
        path: "12dickGregory.mp3",
      },
      {
        title: "Baby Boss Me Around",
        path: "13babyBossMeAround.mp3",
      },
      {
        title: "My Heart Was Won By a Girl",
        path: "14myHeartWasWonByAGirl.mp3",
      },
    ],
  },

  {
    group: "lauraPalmerTape",
    title: "Laura Palmer Tape",
    zip: "lauraPalmerTape.zip",
    songs: [
      {
        title: "Government Center",
        path: "01governmentCenter.mp3",
      },
      {
        title: "The New Teller",
        path: "02theNewTeller.mp3",
      },
      {
        title: "Thunderbolts Of Joy",
        path: "03thunderboltsOfJoy.mp3",
      },
      {
        title: "My Honest Dear",
        path: "04myHonestDear.mp3",
      },
      {
        title: "Singing in the Rain",
        path: "05singingInTheRain.mp3",
      },
      {
        title: "So Much Respect For You",
        path: "06soMuchRespectForYou.mp3",
      },
      {
        title: "The Heavens Love Me",
        path: "07theHeavensLoveMe.mp3",
      },
      {
        title: "Kumbaya",
        path: "08cumbya.mp3",
      },
      {
        title: "Hi Fred",
        path: "09hiFred.mp3",
      },
      {
        title: "Flying Saucers Rock-n-Roll",
        path: "10flyingSaucersRocknRolll.mp3",
      },
      {
        title: "Wonderful Girl",
        path: "11wonderfulGirl.mp3",
      },
    ],
  },

  {
    group: "2010",
    title: "2010 Compilation",
    zip: "2010.zip",
    songs: [
      {
        title: "Keith Richards",
        path: "01keithRichards2010.mp3",
      },
      {
        title: "The Dark Crypt Like Arcade",
        path: "02theDarkCryptLikeArcade.mp3",
      },
      {
        title: "Hurricane When She Came",
        path: "03hurricaneWhenSheCame.mp3",
      },
      {
        title: "My Affected Accent",
        path: "04myAffectedAccent.mp3",
      },
      {
        title: "Blowin' in the Wind",
        path: "05blowinInTheWind.mp3",
      },
      {
        title: "Sa Voix M'Atisse",
        path: "06saVoixOlive.mp3",
      },
      {
        title: "Mr. Sorrow",
        path: "07mrSorrow.mp3",
      },
      {
        title: "Loneliness",
        path: "08lonliness.mp3",
      },
      {
        title: "A Hard Time Saying Goodbye",
        path: "09aHardTimeSayingGoodbye.mp3",
      },
      {
        title: "These Bodies",
        path: "10theseBodies.mp3",
      },
      {
        title: "Bitter Herb",
        path: "11bitterEarth.mp3",
      },
      {
        title: "Song About a Party",
        path: "12songAboutAParty.mp3",
      },
      {
        title: "Older Girl",
        path: "13olderGirl2010.mp3",
      },
      {
        title: "Arrivederci Roma",
        path: "14arrividerciRoma.mp3",
      },
      {
        title: "J'aime Paris Au Mois De Mai",
        path: "15jaimeParisAuMoisDeMai.mp3",
      },
      {
        title: "Barcelona",
        path: "16barcelona.mp3",
      },
      {
        title: "Hassemla Classica",
        path: "17hassemlaClassica.mp3",
      },
      {
        title: "Camina Y Ven Pa La Loma",
        path: "18caminaYVenPaLaLoma.mp3",
      },
      {
        title: "Stupenda",
        path: "19stupenda.mp3",
      },
      {
        title: "Partners In Crime",
        path: "20partnersInCrime.mp3",
      },
      {
        title: "My Affected Accent",
        path: "21myAffectedAccent.mp3",
      },
      {
        title: "Older Girl",
        path: "22olderGirl.mp3",
      },
      {
        title: "Keith Richards",
        path: "23keithRichards.mp3",
      },
      {
        title: "Winter Is Over For Me",
        path: "24winterIsOverForMe.mp3",
      },
    ],
  },

  {
    group: "oldies",
    title: "Oldies Covers Compilation",
    zip: "oldies.zip",
    songs: [
      {
        title: "Back in the USA",
        path: "01backInTheUSA.mp3",
      },
      {
        title: "Don't You Just Know It",
        path: "02dontYouJustKnowIt.mp3",
      },
      {
        title: "My Guy",
        path: "03myGuy.mp3",
      },
      {
        title: "You Are",
        path: "04youAre.mp3",
      },
      {
        title: "Flying Saucers Rock and Roll",
        path: "05flyingSaucersRockAndRoll.mp3",
      },
      {
        title: "Too Fat",
        path: "06tooFat.mp3",
      },
      {
        title: "Rock and Roll House",
        path: "07rockAndRollHouse.mp3",
      },
      {
        title: "Hello Josephine",
        path: "08helloJosephine.mp3",
      },
      {
        title: "La Bamba",
        path: "09laBamba.mp3",
      },
      {
        title: "Peppermint Twist",
        path: "10peppermintTwist.mp3",
      },
      {
        title: "Roll With Me Henry",
        path: "11rollWithMeHenry.mp3",
      },
      {
        title: "Pearl",
        path: "12pearl.mp3",
      },
      {
        title: "Good Lovin'",
        path: "13goodLovin.mp3",
      },
      {
        title: "Hang On Sloopy",
        path: "14hangOnSloopy.mp3",
      },
      {
        title: "Seven Day Weekend",
        path: "15sevenDayWeekend.mp3",
      },
      {
        title: "Route 66",
        path: "16route66.mp3",
      },
      {
        title: "Tallahassee Lassie",
        path: "17tallahasseeLassie.mp3",
      },
      {
        title: "My Boogie Woogie Country Girl",
        path: "18myBoogieWoogieCountryGirl.mp3",
      },
      {
        title: "Roll Over Beethoven",
        path: "19rollOverBeethoven.mp3",
      },
      {
        title: "Buzz Buzz Buzz",
        path: "20buzzBuzzBuzz.mp3",
      },
      {
        title: "Pretty Little Girl",
        path: "21prettyLittleGirl.mp3",
      },
      {
        title: "Jenny Jenny Good Golly",
        path: "22jennyJennyGoodGolly.mp3",
      },
      {
        title: "I Need Someone",
        path: "23iNeedSomeone.mp3",
      },
      {
        title: "I Like It Like That",
        path: "24iLikeItLikeThat.mp3",
      },
    ],
  },
];

const downloadPrefix = "http://192.81.214.19/media";
const generateList = ({ group, title, songs, zip }: Section) => (
  <section key={group}>
    <h2>{title}</h2>
    {zip && (
      <a href={`${downloadPrefix}/${group}/${zip}`}>
        <em>Download All</em>
      </a>
    )}
    <ul className="hoverable">
      {songs.map(({ path, title }) => (
        <li key={path}>
          <Link href={`${downloadPrefix}/${group}/${path}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default function Page() {
  const total = sections.reduce(
    (acc, { songs: { length } }) => acc + length,
    0
  );
  return (
    <div className="listen">
      {sections.map(generateList)}
      {`Total downloads: ${total}`}
    </div>
  );
}
