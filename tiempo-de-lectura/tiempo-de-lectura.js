(function() {
  var Article, Marker, ReadTimer;

  ReadTimer = (function() {
    class ReadTimer {
      constructor(container, article1, {wpm} = {}) {
        var article, i, len, ref, self;
        this.container = container;
        this.article = article1;
        self = this;
        this.wpm = wpm != null ? wpm : 250;
        this.el = $(this.container)[0];
        $(this.article).each(function() {
          return self.articles.push(new Article($(this)[0], self.wpm));
        });
        ref = this.articles;
        for (i = 0, len = ref.length; i < len; i++) {
          article = ref[i];
          article.assignReadTime('h1');
        }
      }

    };

    ReadTimer.prototype.articles = [];

    return ReadTimer;

  }).call(this);

  Article = class Article {
    constructor(el1, wpm1) {
      this.el = el1;
      this.wpm = wpm1;
      this.chars = 0;
      this.wordCount = 0;
      this.wordsRead = 0;
      this.readTime = 0;
      this.text = this.getText();
      this.words = this.getWords(this.text);
      this.wordsRemaining = this.wordCount;
      this.readTime = this.wordCount / this.wpm;
      this.aprxTime = this.getApproximateTime(this.readTime);
      this.height = $(this.el).height();
      this.wordsPerPixel = this.words.length / this.height;
      this.marker = this.setMarker();
      $(window).scroll(() => {
        return this.update();
      });
      $(window).resize(() => {
        return this.adjustWPP();
      });
    }

    getText() {
      var text, that;
      that = this;
      text = "";
      $(this.el).children().each(function() {
        var el;
        el = $(this)[0];
        return text += el.textContent || el.innerText || '';
      });
      this.chars = text.length;
      return text;
    }

    getWords(text) {
      var pattern, trimmed, windex, word, words;
      words = [];
      if (this.text.length > 0) {
        trimmed = $.trim(this.text);
        words = trimmed.split(' ');
        pattern = /\s/g;
        for (windex in words) {
          word = words[windex];
          if (word.match(pattern)) {
            words.splice(windex, 1);
          }
        }
        this.wordCount = words.length;
        return words;
      }
    }

    getApproximateTime(time) {
      var rounded;
      return rounded = (Math.round(time * 2)) / 2;
    }

    assignReadTime(el) {
      var note;
      note = document.createElement('span');
      note.className += 'read-time';
      note.innerHTML = this.aprxTime + ' mins';
      return $(this.el).find(el).css('padding-right', '50px').append(note);
    }

    adjustWPP() {
      this.height = $(this.el).height();
      return this.wordsPerPixel = this.words.length / this.height;
    }

    setMarker() {
      $(this.el).css({
        'position': 'relative'
      });
      return new Marker(this.el);
    }

    update() {
      var scrolledTo, timeRem, wordsScrolled;
      scrolledTo = $(window).scrollTop() - $(this.el).offset().top + 200;
      scrolledTo += $(this.el).find('h1').outerHeight();
      wordsScrolled = scrolledTo * this.wordsPerPixel;
      this.wordsRemaining = this.wordCount - wordsScrolled;
      timeRem = this.getApproximateTime(this.wordsRemaining / this.wpm);
      if (timeRem < 0) {
        timeRem = 0;
      }
      $(this.marker.el).css('top', scrolledTo + 'px');
      return this.marker.update(timeRem);
    }

  };

  Marker = class Marker {
    constructor(container) {
      this.container = container;
      this.el = this.createMarker();
    }

    createMarker() {
      var marker;
      marker = document.createElement('div');
      marker.className += 'read-marker';
      marker.innerHTML = '<i class="fa fa-arrow-down"></i> <span></span>';
      $(this.container).append(marker);
      return marker;
    }

    update(time) {
      var mins, that;
      that = this;
      mins = time === 1 ? 'min' : 'mins';
      $(this.el).find('span').text(time + ' ' + mins);
      $(this.el).stop().addClass('fadeIn');
      return setTimeout(function() {
        return $(that.el).removeClass('fadeIn');
      }, 500);
    }

  };

  $(function() {
    return new ReadTimer('#wrapper', 'article', {
      wpm: 180
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7O0VBQU07SUFBTixNQUFBLFVBQUE7TUFFRSxXQUFhLFVBQUEsVUFBQSxFQUF1QixDQUFDLEdBQUQsSUFBUSxDQUFBLENBQS9CLENBQUE7QUFDZixZQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtRQURnQixJQUFDLENBQUE7UUFBVyxJQUFDLENBQUE7UUFDekIsSUFBQSxHQUFPO1FBQ1AsSUFBQyxDQUFBLEdBQUQsaUJBQU8sTUFBTTtRQUNiLElBQUMsQ0FBQSxFQUFELEdBQU0sQ0FBQSxDQUFFLElBQUMsQ0FBQSxTQUFILENBQWEsQ0FBQyxDQUFEO1FBQ25CLENBQUEsQ0FBRSxJQUFDLENBQUEsT0FBSCxDQUFXLENBQUMsSUFBWixDQUFpQixRQUFBLENBQUEsQ0FBQTtpQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQWQsQ0FBbUIsSUFBSSxPQUFKLENBQVksQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLENBQUQsQ0FBbkIsRUFBd0IsSUFBSSxDQUFDLEdBQTdCLENBQW5CO1FBRGUsQ0FBakI7QUFHQTtRQUFBLEtBQUEscUNBQUE7O1VBQ0UsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsSUFBdkI7UUFERjtNQVBXOztJQUZmOzt3QkFDRSxRQUFBLEdBQVU7Ozs7OztFQVlOLFVBQU4sTUFBQSxRQUFBO0lBRUUsV0FBYSxJQUFBLE1BQUEsQ0FBQTtNQUFDLElBQUMsQ0FBQTtNQUFJLElBQUMsQ0FBQTtNQUNsQixJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLFNBQUQsR0FBYTtNQUNiLElBQUMsQ0FBQSxTQUFELEdBQWE7TUFDYixJQUFDLENBQUEsUUFBRCxHQUFZO01BQ1osSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsT0FBRCxDQUFB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YixJQUFDLENBQUEsRUFBRCxHQUFNLElBQUMsQ0FBQSxZQUFELENBQUE7SUFGSzs7SUFJYixZQUFjLENBQUEsQ0FBQTtBQUNoQixVQUFBO01BQUksTUFBQSxHQUFTLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO01BQ1QsTUFBTSxDQUFDLFNBQVAsSUFBb0I7TUFDcEIsTUFBTSxDQUFDLFNBQVAsR0FBbUI7TUFDbkIsQ0FBQSxDQUFFLElBQUMsQ0FBQSxTQUFILENBQWEsQ0FBQyxNQUFkLENBQXFCLE1BQXJCO2FBQ0E7SUFMWTs7SUFPZCxNQUFRLENBQUMsSUFBRCxDQUFBO0FBQ1YsVUFBQSxJQUFBLEVBQUE7TUFBSSxJQUFBLEdBQU87TUFDUCxJQUFBLEdBQVUsSUFBQSxLQUFRLENBQVgsR0FBa0IsS0FBbEIsR0FBNkI7TUFDcEMsQ0FBQSxDQUFFLElBQUMsQ0FBQSxFQUFILENBQU0sQ0FBQyxJQUFQLENBQVksTUFBWixDQUFtQixDQUFDLElBQXBCLENBQTBCLElBQUEsR0FBTyxHQUFQLEdBQWEsSUFBdkM7TUFDQSxDQUFBLENBQUUsSUFBQyxDQUFBLEVBQUgsQ0FBTSxDQUFDLElBQVAsQ0FBQSxDQUFhLENBQUMsUUFBZCxDQUF1QixRQUF2QjthQUNBLFVBQUEsQ0FBVyxRQUFBLENBQUEsQ0FBQTtlQUNQLENBQUEsQ0FBRSxJQUFJLENBQUMsRUFBUCxDQUFVLENBQUMsV0FBWCxDQUF1QixRQUF2QjtNQURPLENBQVgsRUFFRSxHQUZGO0lBTE07O0VBYlY7O0VBc0JBLENBQUEsQ0FBRSxRQUFBLENBQUEsQ0FBQTtXQUNBLElBQUksU0FBSixDQUFjLFVBQWQsRUFBMEIsU0FBMUIsRUFBcUM7TUFBQyxHQUFBLEVBQUk7SUFBTCxDQUFyQztFQURBLENBQUY7QUE5R0EiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBSZWFkVGltZXJcbiAgYXJ0aWNsZXM6IFtdXG4gIGNvbnN0cnVjdG9yOiAoQGNvbnRhaW5lciwgQGFydGljbGUsIHt3cG19ID0ge30pIC0+XG4gICAgc2VsZiA9IHRoaXNcbiAgICBAd3BtID0gd3BtID8gMjUwXG4gICAgQGVsID0gJChAY29udGFpbmVyKVswXVxuICAgICQoQGFydGljbGUpLmVhY2ggKCktPlxuICAgICAgc2VsZi5hcnRpY2xlcy5wdXNoIG5ldyBBcnRpY2xlICQodGhpcylbMF0sIHNlbGYud3BtXG4gICAgXG4gICAgZm9yIGFydGljbGUgaW4gQGFydGljbGVzXG4gICAgICBhcnRpY2xlLmFzc2lnblJlYWRUaW1lICdoMSdcbiAgICBcbiAgICBcbmNsYXNzIEFydGljbGVcbiAgXG4gIGNvbnN0cnVjdG9yOiAoQGVsLCBAd3BtKSAtPlxuICAgIEBjaGFycyA9IDBcbiAgICBAd29yZENvdW50ID0gMFxuICAgIEB3b3Jkc1JlYWQgPSAwXG4gICAgQHJlYWRUaW1lID0gMFxuICAgIEB0ZXh0ID0gQGdldFRleHQoKVxuICAgIEB3b3JkcyA9IEBnZXRXb3JkcyBAdGV4dFxuICAgIEB3b3Jkc1JlbWFpbmluZyA9IEB3b3JkQ291bnRcbiAgICBAcmVhZFRpbWUgPSBAd29yZENvdW50IC8gQHdwbVxuICAgIEBhcHJ4VGltZSA9IEBnZXRBcHByb3hpbWF0ZVRpbWUgQHJlYWRUaW1lXG4gICAgQGhlaWdodCA9ICQoQGVsKS5oZWlnaHQoKVxuICAgIEB3b3Jkc1BlclBpeGVsID0gIEB3b3Jkcy5sZW5ndGggLyBAaGVpZ2h0XG4gICAgQG1hcmtlciA9IEBzZXRNYXJrZXIoKVxuICAgIFxuICAgICQod2luZG93KS5zY3JvbGwgKCk9PlxuICAgICAgQHVwZGF0ZSgpXG4gICAgXG4gICAgJCh3aW5kb3cpLnJlc2l6ZSAoKT0+XG4gICAgICBAYWRqdXN0V1BQKClcbiAgICBcbiAgZ2V0VGV4dDogLT5cbiAgICB0aGF0ID0gQFxuICAgIHRleHQgPSBcIlwiXG4gICAgJChAZWwpLmNoaWxkcmVuKCkuZWFjaCAoKS0+XG4gICAgICBlbCA9ICQodGhpcylbMF1cbiAgICAgIHRleHQgKz0gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0IHx8ICcnXG4gICAgQGNoYXJzID0gdGV4dC5sZW5ndGhcbiAgICB0ZXh0XG4gICAgICBcbiAgZ2V0V29yZHM6ICh0ZXh0KS0+XG4gICAgd29yZHMgPSBbXVxuICAgIGlmIEB0ZXh0Lmxlbmd0aCA+IDBcbiAgICAgIHRyaW1tZWQgPSAkLnRyaW0gQHRleHRcbiAgICAgIHdvcmRzID0gdHJpbW1lZC5zcGxpdCAnICdcbiAgICAgIHBhdHRlcm4gPSAvXFxzL2dcbiAgICAgIGZvciB3aW5kZXgsIHdvcmQgb2Ygd29yZHNcbiAgICAgICAgaWYgd29yZC5tYXRjaCBwYXR0ZXJuIFxuICAgICAgICAgIHdvcmRzLnNwbGljZSB3aW5kZXgsIDFcbiAgICAgIEB3b3JkQ291bnQgPSB3b3Jkcy5sZW5ndGhcbiAgICAgIHdvcmRzXG4gICAgICBcbiAgZ2V0QXBwcm94aW1hdGVUaW1lOiAodGltZSkgLT5cbiAgICByb3VuZGVkID0gKE1hdGgucm91bmQodGltZSAqIDIpICkgLyAyXG4gICAgXG4gIGFzc2lnblJlYWRUaW1lOiAoZWwpIC0+XG4gICAgbm90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NwYW4nXG4gICAgbm90ZS5jbGFzc05hbWUgKz0gJ3JlYWQtdGltZSdcbiAgICBub3RlLmlubmVySFRNTCA9IEBhcHJ4VGltZSArICcgbWlucydcbiAgICAkKEBlbCkuZmluZChlbCkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgJzUwcHgnKS5hcHBlbmQgbm90ZVxuICAgIFxuICBhZGp1c3RXUFA6IC0+XG4gICAgQGhlaWdodCA9ICQoQGVsKS5oZWlnaHQoKVxuICAgIEB3b3Jkc1BlclBpeGVsID0gIEB3b3Jkcy5sZW5ndGggLyBAaGVpZ2h0XG4gICAgXG4gIHNldE1hcmtlcjogLT5cbiAgICAkKEBlbCkuY3NzKCdwb3NpdGlvbic6ICdyZWxhdGl2ZScpXG4gICAgbmV3IE1hcmtlciBAZWxcbiAgICBcbiAgdXBkYXRlOiAtPlxuICAgIHNjcm9sbGVkVG8gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSAkKEBlbCkub2Zmc2V0KCkudG9wICsgMjAwXG4gICAgXG4gICAgc2Nyb2xsZWRUbyArPSAkKEBlbCkuZmluZCgnaDEnKS5vdXRlckhlaWdodCgpO1xuICAgIFxuICAgIHdvcmRzU2Nyb2xsZWQgPSBzY3JvbGxlZFRvICogQHdvcmRzUGVyUGl4ZWxcbiAgICBAd29yZHNSZW1haW5pbmcgPSBAd29yZENvdW50IC0gd29yZHNTY3JvbGxlZFxuICAgIFxuICAgIHRpbWVSZW0gPSBAZ2V0QXBwcm94aW1hdGVUaW1lIChAd29yZHNSZW1haW5pbmcgLyBAd3BtKVxuICAgIFxuICAgIGlmIHRpbWVSZW0gPCAwIHRoZW4gdGltZVJlbSA9IDBcbiAgICBcbiAgICAkKEBtYXJrZXIuZWwpLmNzcygndG9wJywgc2Nyb2xsZWRUbyArICdweCcpXG4gICAgQG1hcmtlci51cGRhdGUgdGltZVJlbVxuICBcbmNsYXNzIE1hcmtlclxuICBcbiAgY29uc3RydWN0b3I6IChAY29udGFpbmVyKSAtPlxuICAgIFxuICAgIEBlbCA9IEBjcmVhdGVNYXJrZXIoKVxuICBcbiAgY3JlYXRlTWFya2VyOiAtPlxuICAgIG1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgICBtYXJrZXIuY2xhc3NOYW1lICs9ICdyZWFkLW1hcmtlcidcbiAgICBtYXJrZXIuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtYXJyb3ctZG93blwiPjwvaT4gPHNwYW4+PC9zcGFuPidcbiAgICAkKEBjb250YWluZXIpLmFwcGVuZCBtYXJrZXJcbiAgICBtYXJrZXJcbiAgICBcbiAgdXBkYXRlOiAodGltZSkgLT5cbiAgICB0aGF0ID0gQFxuICAgIG1pbnMgPSBpZiB0aW1lID09IDEgdGhlbiAnbWluJyBlbHNlICdtaW5zJ1xuICAgICQoQGVsKS5maW5kKCdzcGFuJykudGV4dCggdGltZSArICcgJyArIG1pbnMpXG4gICAgJChAZWwpLnN0b3AoKS5hZGRDbGFzcygnZmFkZUluJylcbiAgICBzZXRUaW1lb3V0ICgpLT5cbiAgICAgICAgJCh0aGF0LmVsKS5yZW1vdmVDbGFzcygnZmFkZUluJylcbiAgICAsIDUwMFxuICAgIFxuJCAtPlxuICBuZXcgUmVhZFRpbWVyICcjd3JhcHBlcicsICdhcnRpY2xlJywge3dwbToxODB9Il19
//# sourceURL=coffeescript