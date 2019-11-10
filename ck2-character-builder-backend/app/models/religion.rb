class Religion

  class << self
    def all
      {
        christian: [
          "Catholic",
          "Fraticelli",
          "Chathar",
          "Lollard",
          "Waldensian",
          "Orthodox",
          "Iconoclast",
          "Bogomilist",
          "Miaphysite",
          "Monophysite",
          "Nestorian",
          "Messalian"
        ],

        islam: [
          "Sunni",
          "Yazidi",
          "Zikri",
          "Shia",
          "Druze",
          "Hurufi",
          "Qarmatian",
          "Ibadi",
          "Kharijite"
        ],

        israelite: [
          "Jewish",
          "Samaritan",
          "Karaite"
        ],

        mazdan: [
          "Zoroastrian",
          "Khurmazta",
          "Mazdaki",
          "Manichaean"
        ],

        eastern: [
          "Hindu",
          "Buddhist",
          "Jainist",
          "Taoist"
        ],

        pagan: [
          "Germanic",
          "Tengri",
          "Aztec",
          "Slavic",
          "Romuva",
          "Suomenusko",
          "African",
          "Zunist",
          "Bön",
          "Hellenic"
        ]
      }
    end
  end

end