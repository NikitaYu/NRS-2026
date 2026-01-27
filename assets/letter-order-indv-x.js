jQuery(function($){
  var currentCollectionHandleX = null;

  function resetFormUIX() {
    $('#letter-height-x').html('<option value="">Select Height</option>');
    $('#letter-color-x').html('<option value="">Select Color</option>');
    $('.letters-x input').val('');
    $('.letter-x').show();
    $('.price-x').text('$0.00');
    $('#chars-error-x, #color-error-x').hide();
  }

  function populateDescriptionX(handle) {
    var data = allCollectionsDataX[handle];
    if (!data) return;

    var imageHtml = '';
    if (data.image) {
      imageHtml = '<img src="' + data.image + '" alt="' + (data.title || '') + '" class="collection-image-x">';
    }
    var titleHtml = '<h3 class="collection-title-x">' + (data.title || '') + '</h3>';
    var mainDesc = data.description || '';
    mainDesc = mainDesc.replace(/<h3>Starting at only/g, '<h3 class="desc-price-highlight-x">Starting at only');
    mainDesc = mainDesc.replace(/<ul class="two-cols">/g, '<ul class="two-cols desc-price-list-x">');

    var html = '<div class="tabs-container-x">';
    html += '<div class="tabs-nav-x">';
    html += '<div class="tab-link-x active" data-tab="tab-description-x">DESCRIPTION</div>';
    if (data.has_details) {
      html += '<div class="tab-link-x" data-tab="tab-details-x">DETAILS</div>';
    }
    if (data.has_specs) {
      html += '<div class="tab-link-x" data-tab="tab-specs-x">USE WITH</div>';
    }
    html += '</div>';

    html += '<div class="tab-content-x">';
    html += '<div id="tab-description-x" class="tab-pane-x active">';
    html += imageHtml + titleHtml + mainDesc;
    html += '</div>';

    if (data.has_details) {
      html += '<div id="tab-details-x" class="tab-pane-x">' + (data.details || '') + '</div>';
    }
    if (data.has_specs) {
      html += '<div id="tab-specs-x" class="tab-pane-x">' + (data.specs || '') + '</div>';
    }

    html += '</div>';
    html += '</div>';

    $('.description-column-x').html(html);

    var parentHandle = data.parent_handle || '';
    $('.description-column-x a[href*="NRS-Know-Your-Inventory-Form.pdf"]').addClass('desc-styled-link-x');
    if (parentHandle) $('.description-column-x a[href*="'+parentHandle+'?type=set"]').addClass('desc-styled-link-x');
  }

  function populateHeightDropdownX(handle) {
    var data = allCollectionsDataX[handle];
    var heightSelect = $('#letter-height-x');
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

  function updateCharactersX() {
    var height = $('#letter-height-x').val();
    var color = $('#letter-color-x').val();
    $('.letter-x').hide();
    if (!height || !color || !currentCollectionHandleX) return;
    var key = height + "||" + color;
    var avail = (allCollectionsDataX[currentCollectionHandleX].height_color_obj[key] || []);
    avail.forEach(function(letterStr){
      $('input[name="'+letterStr+'"]').closest('.letter-x').show();
    });
  }

  function updatePriceX() {
    var height = $('#letter-height-x').val();
    var color = $('#letter-color-x').val();
    var total = 0;
    if (!height || !color || !currentCollectionHandleX) {
      $('.price-x').text('$0.00');
      return;
    }
    var baseKey = height + "||" + color + "||";
    $('.letters-x input:visible').each(function(){
      var qty = parseInt($(this).val()) || 0;
      if (qty > 0) {
        var letterStr = $(this).attr('name');
        var fullKey = baseKey + letterStr;
        var price = allCollectionsDataX[currentCollectionHandleX].price_obj[fullKey] || 0;
        total += qty * price;
      }
    });
    $('.price-x').text('$' + total.toFixed(2));
  }

  function selectCollectionX(handle) {
    if (!handle || !allCollectionsDataX[handle]) return;
    if (handle === currentCollectionHandleX) return;
    currentCollectionHandleX = handle;
    $('.collection-selector-item-x').removeClass('active');
    $('.collection-selector-item-x[data-handle="'+handle+'"]').addClass('active');
    resetFormUIX();
    populateDescriptionX(handle);
    populateHeightDropdownX(handle);
    if (allCollectionsDataX[handle].products_available) {
      $('#add-x').show();
      $('#sold_out-x').hide();
    } else {
      $('#add-x').hide();
      $('#sold_out-x').show();
    }
  }

  $('.collection-selector-item-x').on('click', function(){
    var h = $(this).data('handle');
    selectCollectionX(h);
  });

  $('#letter-height-x').on('change', function(){
    var h = $(this).val();
    var colorSelect = $('#letter-color-x');
    colorSelect.html('<option value="">Select Color</option>');
    if (h && currentCollectionHandleX) {
      var colors = allCollectionsDataX[currentCollectionHandleX].height_obj[h] || [];
      colors.sort().forEach(function(c){
        colorSelect.append('<option value="'+c+'">'+c+'</option>');
      });
    }
    updateCharactersX();
    updatePriceX();
  });

  $('#letter-color-x').on('change', function(){
    updateCharactersX();
    updatePriceX();
  });

  $('.letters-x input').on('input', function(){ updatePriceX(); });

  $('.letters-form-x').on('submit', function(e){
    e.preventDefault();
    $('#chars-error-x, #color-error-x').hide();
    if (!currentCollectionHandleX) return;
    var height = $('#letter-height-x').val();
    var color = $('#letter-color-x').val();
    if (!height || !color) {
      $('#color-error-x').show();
      return;
    }
    var items = [];
    var hasItems = false;
    var baseKey = height + "||" + color + "||";
    $('.letters-x input:visible').each(function(){
      var qty = parseInt($(this).val()) || 0;
      if (qty > 0) {
        hasItems = true;
        var letterStr = $(this).attr('name');
        var fullKey = baseKey + letterStr;
        var variantId = allCollectionsDataX[currentCollectionHandleX].variant_obj[fullKey];
        if (variantId) items.push({ id: variantId, quantity: qty });
      }
    });
    if (!hasItems) { $('#chars-error-x').show(); return; }
    $.post('/cart/add.js', { items: items })
      .done(function(){ window.location = '/cart'; })
      .fail(function(){ alert('Error adding items to cart. Please try again.'); });
  });

  $('.description-column-x').on('click', '.tab-link-x', function(){
    var tab = $(this).data('tab');
    $(this).closest('.tabs-nav-x').find('.tab-link-x').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.tabs-container-x').find('.tab-pane-x').removeClass('active');
    $('#' + tab).addClass('active');
  });

  (function(){
    var urlParams = new URLSearchParams(window.location.search);
    var c = urlParams.get('collection');
    if (c && allCollectionsDataX[c]) { selectCollectionX(c); return; }
    var first = null;
    for (var key in allCollectionsDataX) { first = key; break; }
    if (first) selectCollectionX(first);
  })();
});
</script>

{% schema %}
{
  "name": "Indv Letter Order - x",
  "presets": [
    {
      "name": "Indv Letter Order - x"
    }
  ]
}
{% endschema %}
</xaiArtifact>

### Test Steps
1. **Save & Check**: Paste this into VS Code as `sections/letter-order-indv-x.liquid`, run `shopify theme check` (should be 0 errors).
2. **Upload**: `shopify theme push sections/letter-order-indv-x.liquid assets/letter-order-indv-x.js --theme=143355936919`.
3. **Preview**: Refresh the preview URL. The JS should load and function exactly like before (collections, tabs, form updates), but from an external file (check Network tab in DevTools to confirm `letter-order-indv-x.js` loads with 200 status).

If it's all good, you're golden! If the JS doesn't fire (e.g., timing issue), we can switch to `async` or add `DOMContentLoaded`. How's it running? 🚀