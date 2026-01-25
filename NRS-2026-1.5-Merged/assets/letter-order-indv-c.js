jQuery(function($){
  $('.loic-page-order-page').each(function(){
    var $section = $(this);
    var sectionIdClean = $section.data('section-id-clean');
    var allCollectionsData = window['loicCollectionsDataC_' + sectionIdClean];

    if (!allCollectionsData) {
      console.error('No collection data found for section:', sectionIdClean);
      return;
    }

    var currentCollectionHandle = null;

    function resetFormUI() {
      $section.find('.loic-letter-height').html('<option value="">Select Height</option>');
      $section.find('.loic-letter-color').html('<option value="">Select Color</option>');
      $section.find('.loic-letters input').val('');
      $section.find('.loic-letter').show();
      $section.find('.loic-price').text('$0.00');
      $section.find('.loic-chars-error, .loic-color-error').hide();
    }

    function populateDescription(handle) {
      var data = allCollectionsData[handle];
      if (!data) return;

      var imageHtml = '';
      if (data.image) {
        imageHtml = '<img src="' + data.image + '" alt="' + (data.title || '') + '" class="loic-collection-image">';
      }
      var titleHtml = '<h3 class="loic-collection-title">' + (data.title || '') + '</h3>';
      var mainDesc = data.description || '';
      mainDesc = mainDesc.replace(/<h3>Starting at only/g, '<h3 class="loic-desc-price-highlight">Starting at only');
      mainDesc = mainDesc.replace(/<ul class="two-cols">/g, '<ul class="two-cols loic-desc-price-list">');

      var html = '<div class="loic-tabs-container">';
      html += '<div class="loic-tabs-nav">';
      html += '<div class="loic-tab-link active" data-tab="tab-description">DESCRIPTION</div>';
      if (data.has_details) {
        html += '<div class="loic-tab-link" data-tab="tab-details">DETAILS</div>';
      }
      if (data.has_specs) {
        html += '<div class="loic-tab-link" data-tab="tab-specs">USE WITH</div>';
      }
      html += '</div>';

      html += '<div class="loic-tab-content">';
      html += '<div id="tab-description" class="loic-tab-pane active">';
      html += imageHtml + titleHtml + mainDesc;
      html += '</div>';

      if (data.has_details) {
        html += '<div id="tab-details" class="loic-tab-pane">' + (data.details || '') + '</div>';
      }
      if (data.has_specs) {
        html += '<div id="tab-specs" class="loic-tab-pane">' + (data.specs || '') + '</div>';
      }

      html += '</div>';
      html += '</div>';

      $section.find('.loic-description-column').html(html);

      var parentHandle = data.parent_handle || '';
      $section.find('.loic-description-column a[href*="NRS-Know-Your-Inventory-Form.pdf"]').addClass('loic-desc-styled-link');
      if (parentHandle) $section.find('.loic-description-column a[href*="'+parentHandle+'?type=set"]').addClass('loic-desc-styled-link');
    }

    function populateHeightDropdown(handle) {
      var data = allCollectionsData[handle];
      var heightSelect = $section.find('.loic-letter-height');
      heightSelect.html('<option value="">Select Height</option>');
      if (!data || !data.height_obj) return;
      var heights = Object.keys(data.height_obj || {}).sort(function(a,b){
        var numA = parseFloat(a.replace(/[^\d.-]/g,'')) || 0;
        var numB = parseFloat(b.replace(/[^\d.-]/g,'')) || 0;
        return numA - numB;
      });
      heights.forEach(function(h){
        heightSelect.append('<option value="'+h+'">'+h+'</option>');
      });
    }

    function updateCharacters() {
      var height = $section.find('.loic-letter-height').val();
      var color = $section.find('.loic-letter-color').val();
      $section.find('.loic-letter').hide();
      if (!height || !color || !currentCollectionHandle) return;
      var key = height + "||" + color;
      var avail = (allCollectionsData[currentCollectionHandle].height_color_obj[key] || []);
      avail.forEach(function(letterStr){
        $section.find('input[name="'+letterStr+'"]').closest('.loic-letter').show();
      });
    }

    function updatePrice() {
      var height = $section.find('.loic-letter-height').val();
      var color = $section.find('.loic-letter-color').val();
      var total = 0;
      if (!height || !color || !currentCollectionHandle) {
        $section.find('.loic-price').text('$0.00');
        return;
      }
      var baseKey = height + "||" + color + "||";
      $section.find('.loic-letters input:visible').each(function(){
        var qty = parseInt($(this).val()) || 0;
        if (qty > 0) {
          var letterStr = $(this).attr('name');
          var fullKey = baseKey + letterStr;
          var price = allCollectionsData[currentCollectionHandle].price_obj[fullKey] || 0;
          total += qty * price;
        }
      });
      $section.find('.loic-price').text('$' + total.toFixed(2));
    }

    function selectCollection(handle) {
      if (!handle || !allCollectionsData[handle]) return;
      if (handle === currentCollectionHandle) return;
      currentCollectionHandle = handle;
      $section.find('.loic-collection-selector-item').removeClass('active');
      $section.find('.loic-collection-selector-item[data-handle="'+handle+'"]').addClass('active');
      resetFormUI();
      populateDescription(handle);
      populateHeightDropdown(handle);
      if (allCollectionsData[handle].products_available) {
        $section.find('.loic-add').show();
        $section.find('.loic-sold_out').hide();
      } else {
        $section.find('.loic-add').hide();
        $section.find('.loic-sold_out').show();
      }
    }

    $section.find('.loic-collection-selector-item').on('click', function(){
      var h = $(this).data('handle');
      selectCollection(h);
    });

    $section.find('.loic-letter-height').on('change', function(){
      var h = $(this).val();
      var colorSelect = $section.find('.loic-letter-color');
      colorSelect.html('<option value="">Select Color</option>');
      if (h && currentCollectionHandle) {
        var colors = allCollectionsData[currentCollectionHandle].height_obj[h] || [];
        colors.sort().forEach(function(c){
          colorSelect.append('<option value="'+c+'">'+c+'</option>');
        });
      }
      updateCharacters();
      updatePrice();
    });

    $section.find('.loic-letter-color').on('change', function(){
      updateCharacters();
      updatePrice();
    });

    $section.find('.loic-letters input').on('input', function(){ updatePrice(); });

    $section.find('.loic-letters-form').on('submit', function(e){
      e.preventDefault();
      $section.find('.loic-chars-error, .loic-color-error').hide();
      if (!currentCollectionHandle) return;
      var height = $section.find('.loic-letter-height').val();
      var color = $section.find('.loic-letter-color').val();
      if (!height || !color) {
        $section.find('.loic-color-error').show();
        return;
      }
      var items = [];
      var hasItems = false;
      var baseKey = height + "||" + color + "||";
      $section.find('.loic-letters input:visible').each(function(){
        var qty = parseInt($(this).val()) || 0;
        if (qty > 0) {
          hasItems = true;
          var letterStr = $(this).attr('name');
          var fullKey = baseKey + letterStr;
          var variantId = allCollectionsData[currentCollectionHandle].variant_obj[fullKey];
          if (variantId) items.push({ id: variantId, quantity: qty });
        }
      });
      if (!hasItems) { $section.find('.loic-chars-error').show(); return; }
      $.post('/cart/add.js', { items: items })
        .done(function(){ window.location = '/cart'; })
        .fail(function(){ alert('Error adding items to cart. Please try again.'); });
    });

    $section.find('.loic-description-column').on('click', '.loic-tab-link', function(){
      var tab = $(this).data('tab');
      $(this).closest('.loic-tabs-nav').find('.loic-tab-link').removeClass('active');
      $(this).addClass('active');
      $(this).closest('.loic-tabs-container').find('.loic-tab-pane').removeClass('active');
      $('#' + tab).addClass('active');
    });

    (function(){
      var urlParams = new URLSearchParams(window.location.search);
      var c = urlParams.get('collection');
      if (c && allCollectionsData[c]) { selectCollection(c); return; }
      var first = null;
      for (var key in allCollectionsData) { first = key; break; }
      if (first) selectCollection(first);
    })();
  });
});
